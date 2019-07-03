export default (file, fileName, format) => {
    const link = document.createElement('a')
    link.download = fileName + '.' + format
    // 字符内容转变成blob地址
    let blob = new Blob([file])
    link.href = URL.createObjectURL(blob)
    // 点击下载
    link.click()
    log(link)
}