<template>
<section class="file-action">
    <button class="create">
        <span class="icon icon-create"></span>
        <span>新建</span>
     </button>
    <button @click="showMessageBox = true; showOpenMenu = true" class="open">
         <span class="icon icon-open"></span>
        <span>打开</span>
     </button>
    <button class="download" @click="showMessageBox = true; showOpenMenu = false">
         <span class="icon icon-download"></span>
        <span>下载</span>
     </button>
    <message-box @cancel='showMessageBox = false' @confirm='openFile()' v-if="showMessageBox">
        <p v-if="showOpenMenu">此操作将导致当前思维导图的数据丢失!</p>
        <div v-else>
            <div class="radio-group">
                <label class="radio" @click="toggleCheck(1)">
                    <span class="radio-inner"><span>
                    <span class="radio-label">图片</span>
                </label>
                <label class="radio" @click="toggleCheck(2)">
                    <span class="radio-inner"><span>
                    <span class="radio-label">jm</span>
                </label>
            </div>
        </div>
    </message-box>
</section>
</template>

<script>
import messageBox from '../messageBox'

export default {
    components: {
        messageBox
    },
    data() {
        return {
            showMessageBox: false,
            showOpenMenu: false,
            checked1: true,
            checked2: false,
        }
    },
    methods: {
        toggleCheck(checkId) {
            if (checkId === 1) {
                this.checked1 = !this.checked1
                // this.checked2 = true
            } else {
                this.checked2 = true
                // this.checked1 = false
            }
        },
        download() {
            this.$bus.$emit('downloadImg')
        },
        openFile() {
            this.showMessageBox = false
            //
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.jm'
            // 获取文件后, 触发回调
            input.addEventListener('change', (event) => {
                const file = event.target.files[0]
                log(123)
                const fileName = file.name.split('.') // ['file-title', 'format']
                const fileTitle = fileName[0]
                const format = fileName[1]
                // 读取
                if (format === 'jm') {
                    this.readFile(file)
                } else {
                    alert('暂只支持 jm 文件')
                }
            })
            input.click()
        },
        readFile(file) {
            const fileReader = new FileReader()
            fileReader.onload = (event) => {
                const str = event.target.result
                // log(str, typeof str, JSON.parse(str))
                this.$bus.$emit('readFile', str)
            }
            fileReader.readAsText(file, 'utf-8')
        },
    },
}
</script>

<style lang="scss">
@import '../../assets/styles/icon.css';

.file-action {
    display: flex;
    width: 15%;
    justify-content: space-around;
    margin-left: 40px;

    * {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fff;
        color: #303133;
        border: none;
        font-size: 12px;
        cursor: pointer;
    }
}

.icon {
    font-size: 26px;
}
</style>
