const exportJm = function(mindmap) {
    return JSON.stringify(mindmap)
}

const Jm2Km = function(sourceNode) {
    const targetNode = {}
    targetNode.data = {}
    // 递归格式转换
    // log(sourceNode)
    targetNode.data.id = sourceNode.id
    targetNode.data.text = sourceNode.topic
    targetNode.data.created = Date.now()
    targetNode.data.expandState = sourceNode.expanded ? 'expand' : 'collapse'
    if (sourceNode.children) {
        targetNode.data.children = sourceNode.children.map(child => Jm2Km(child))
    }
    //
    return targetNode
}

const exportKm = function(mindmap) {
    const kmMind = {'root': Jm2Km(mindmap.data)}
    return JSON.stringify(kmMind)
}

const Jm2Md = function(node, layer) {
    if (layer <= 6) {
        return '#'.repeat(layer) + ' ' + node.topic
    }
    return '\t'.repeat(layer - 6) + '- ' + node.topic
}

const Jm2Txt = function(node, layer) {
    return '\t'.repeat(layer) + node.topic
}

const MdAndTxt = function(mindmap, format) {
    const result = []
    
    const dfs = function(node, layer) {
        if (!node) {
            return
        }
        // 判断文件类型，调用不同翻译函数
        let r
        if (format === 'md') {
            r = Jm2Md(node, layer)
        } else {
            r = Jm2Txt(node, layer - 1)
        }
        result.push(r)
        // 递归翻译子节点
        if (node.children) {
            node.children.forEach(child => {
                dfs(child, layer + 1)
            })
        }
    }
    // 深度优先搜索 遍历
    dfs(mindmap.data, 1)
    //
    return result.join('\n')
}

const exportMd = function(mindmap) {
    return MdAndTxt(mindmap, 'md')
}


const exportTxt = function(mindmap) {
    return MdAndTxt(mindmap, 'txt')
}

const exportMm = function(mindmap) {
    return mindmap.data
}

const formats = {
    'jm': exportJm,
    'km': exportKm,
    'md': exportMd,
    'txt': exportTxt,
    'mm': exportMm,
}

export default (mindmap, format) => {
    return formats[format](mindmap)
}