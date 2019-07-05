const newid = () => {
    return (new Date().getTime().toString(16)+Math.random().toString(16).substr(2)).substr(2,16);
}
    
const parseJm = (mindmap) => {
    return  JSON.parse(mindmap)
}

const getLayerAndTxet = (line, format) => {
    let layer, text
    if (format === 'md') {
        // '### abc'.match(/^#{1,6} /) 返回 ['### ']
        let lineArr = line.match(/^#{1,6} /)
        if (lineArr !== null) {
            // '### abc' 层级为 2， 以此类推
            layer = lineArr[0].length - 2
            text = line.split(' ')[1]
        } else {
            // 匹配 '   - abc', 返回 ['     - ']
            lineArr = line.match(/^\s*\S /)
            layer = lineArr[0].length + 3
            text = line.split(' ')[1]
        }
    } else if (format === 'txt') {
        layer = line.match(/^\s*/)[0].length
        text = line.replace(/^\s*/, '')

    }
    return {'layer': layer, 'text': text}
}

const buildNodeFromText = (dataArray, format, currentLayer, currentText = '') => {
    if (currentLayer === -1 && dataArray.length === 0) {
        return
    } 
    if (currentLayer === -1) {
        let rootNode = getLayerAndTxet(dataArray.shift(), format)
        currentLayer = rootNode.layer || 0
        currentText = rootNode.text || '未知数据'
    }
    const currentNode = {
        'id': currentLayer === 0 ? 'root' : newid(),
        'topic': currentText,
        'expanded': true,
        'children': [],
    }
    while (dataArray.length > 0) {
        let {layer, text} = getLayerAndTxet(dataArray[0], format)
        // 当下个节点的 layer 大于 当前节点时， 说明下个节点是当前节点的 子节点
        if (layer > currentLayer) {
            // 删去当前节点的子节点
            dataArray.shift()
            //
            let child = buildNodeFromText(dataArray, format, layer, text)
            currentNode.children.push(child)
        } else {
            break
        }
    }
    return currentNode
}

const parseMdAndTxt = (mindmap, format) => {
    let dataArray = mindmap.split('\n')
    let data = buildNodeFromText(dataArray, format, -1)
    const tempJm = {
        /* 元数据，定义思维导图的名称、作者、版本等信息 */
        "meta":{
            "name": "Vmind",
            "author": "sdk233@outlook.com",
            "version": "0.1",
        },
        /* 数据格式声明 */
        "format":"node_tree",
        /* 数据内容 */
        "data": {}
    }
    tempJm.data = data
    return tempJm
}

const Km2Jm = (sourceNode) => {
    const targetNode = {}
    targetNode.id = sourceNode.id
    targetNode.topic = sourceNode.text
    targetNode.id = sourceNode.id
    targetNode.expanded = sourceNode.expandState === 'expand' ? true : false
    if (sourceNode.children) {
        targetNode.children = sourceNode.children.map(child => Km2Jm(child.data))
    }
    return targetNode
}

const parseKm = (mindmap) => {
    let kmTree = JSON.parse(mindmap)
    let data = Km2Jm(kmTree.root.data)
    return {
        /* 元数据，定义思维导图的名称、作者、版本等信息 */
        "meta":{
            "name": "Vmind",
            "author": "sdk233@outlook.com",
            "version": "0.1",
        },
        /* 数据格式声明 */
        "format":"node_tree",
        /* 数据内容 */
        "data": data,
    }
}

const parseMm = (mindmap) => {
    return {
        /* 元数据，定义思维导图的名称、作者、版本等信息 */
        "meta":{
            "name": "Vmind",
            "author": "sdk233@outlook.com",
            "version": "0.1",
        },
        /* 数据格式声明 */
        "format":"freemind",
        /* 数据内容 */
        "data": mindmap,
    }
}

const formats = {
    'jm': parseJm,
    'km': parseKm,
    'md': parseMdAndTxt,
    'txt': parseMdAndTxt,
    'mm': parseMm,
}

export default (mindmap, format) => {
    return formats[format](mindmap, format)
}