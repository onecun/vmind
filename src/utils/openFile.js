import { resolve, reject } from "any-promise";

const formats = {
    'jm': true,
    'txt': true,
    'md': true,
    'mm': true,
    'km': true,
}

const readFile = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (event) => {
            const str = event.target.result
            resolve(str)
        }
        fileReader.readAsText(file, 'utf-8')
    })
}

export default () => {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = '.jm,.txt,.md,.km,.mm'
        // 获取文件后, 触发回调
        input.addEventListener('change', (event) => {
            const file = event.target.files[0]
            const fileName = file.name.split('.') // ['file-title', 'format']
            const fileTitle = fileName[0]
            const format = fileName[1].toLocaleLowerCase()
            // 读取
            if (formats[format]) {
                readFile(file).then( (data) => {
                    resolve({'data': data, 'format': format})
                })
            } else {
                alert('暂不支持此类文件')
            }
        })
        input.click()
        input.remove()
    })
}