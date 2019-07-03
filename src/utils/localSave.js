export default {
    clearLocal() {
        localStorage.clear()
    },
    getLocal() {
        let str = localStorage.getItem('vmind')
        if (str) {
            return JSON.parse(str)
        } else {
            return str
        }
    },
    saveLocal(str) {
        this.clearLocal()
        localStorage.setItem('vmind', JSON.stringify(str))
    },
}