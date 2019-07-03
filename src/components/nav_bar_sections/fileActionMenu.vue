<template>
<section class="file-action">
    <button @click="showMessageBox = 1" class="create">
        <span class="icon icon-create"></span>
        <span>新建</span>
     </button>
    <button @click="showMessageBox = 2" class="open">
         <span class="icon icon-open"></span>
        <span>打开</span>
     </button>
    <button @click="showMessageBox = 3" class="download">
         <span class="icon icon-download"></span>
        <span>导出</span>
     </button>
    <message-box @cancel='showMessageBox = 0' @confirm='clickConfirm()' v-if="showMessageBox !== 0">
        <p v-if="showMessageBox === 1">此操作将导致当前思维导图的数据丢失!</p>
        <p v-else-if="showMessageBox === 2">此操作将导致当前思维导图的数据丢失!</p>
        <!--  -->
        <div v-else-if="showMessageBox === 3" class="radio-group">
            <p style="padding: 0;">选择下载格式</p>
            <label class="radio" @click="toggleCheck(1)">
                <span class="radio-inner" :class="{'radio-checked': checked === 1}"></span>
                <span class="radio-label">PNG 图片 (.png)</span>
            </label>
            <label class="radio" @click="toggleCheck(2)">
                <span class="radio-inner" :class="{'radio-checked': checked === 2}"></span>
                <span class="radio-label">JMind 格式 (.jm)</span>
            </label>
            <label class="radio" @click="toggleCheck(3)">
                <span class="radio-inner" :class="{'radio-checked': checked === 3}"></span>
                <span class="radio-label">MarkDown 格式 (.md)</span>
            </label>
            <label class="radio" @click="toggleCheck(4)">
                <span class="radio-inner" :class="{'radio-checked': checked === 4}"></span>
                <span class="radio-label">大纲文本 (.txt)</span>
            </label>
            <label class="radio" @click="toggleCheck(5)">
                <span class="radio-inner" :class="{'radio-checked': checked === 5}"></span>
                <span class="radio-label">KityMinder 格式 (.km)</span>
            </label>
            <label class="radio" @click="toggleCheck(6)">
                <span class="radio-inner" :class="{'radio-checked': checked === 6}"></span>
                <span class="radio-label">Freemind 格式 (.mm)</span>
            </label>
        </div>
    </message-box>
</section>
</template>

<script>
import messageBox from '../messageBox'

export default {
    props: ['title'],
    components: {
        messageBox
    },
    data() {
        return {
            // 0, 不显示， 1 新建， 2 打开， 3 下载
            showMessageBox: 0,
            checked: 0,
            downFormat: {
                1: 'img',
                2: 'jm',
                3: 'md',
                4: 'txt',
                5: 'km',
                6: 'mm',
            },
        }
    },
    methods: {
        toggleCheck(checkId) {
            this.checked = checkId
        },
        download() {
            // checked1 下载图片, checked2 下载 jm 文件
            // checked 3 下载 md, 4 txt, 5 km, 6 mm
            let format = this.downFormat[this.checked]
            this.$bus.$emit('download', format, this.title)
        },
        openFile() {
            const input = document.createElement('input')
            input.type = 'file'
            input.accept = '.jm'
            // 获取文件后, 触发回调
            input.addEventListener('change', (event) => {
                const file = event.target.files[0]
                log('openfile')
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
        createNewMind() {
            this.$bus.$emit('createNewMind')
        },
        clickConfirm() {
            let selectShow = {
                1: this.createNewMind,
                2: this.openFile,
                3: this.download,
            }
            selectShow[this.showMessageBox]()
            // 重置 showMessageBox
            this.showMessageBox = 0
        },
    },
}
</script>

<style lang="scss" scoped>
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

.radio-group {
    padding: 0;
    .radio {
        padding: 5px;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        width: 80%;
        margin: 4px 0 4px 0;
        border: 1px solid #DCDFE6;
        border-radius: 6px;
        .radio-inner {
            border: 1px solid #DCDFE6;
            border-radius: 100%;
            width: 14px;
            height: 14px;
            background-color: #fff;
            position: relative;
            padding: 0;
            cursor: pointer;
            display: inline-block;
            box-sizing: border-box;
            &:hover{
                border-color: #409EFF;
            }
        }
        .radio-label {
            padding: 0 !important;
            width: 70%;
        }
    }
    .radio-checked {
        border: 2px solid #409EFF;
        background: #409EFF !important;
        &::after {
            width: 4px;
            height: 4px;
            border-radius: 100%;
            background-color: #fff;
            content: "";
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(1);
            transition: transform .15s ease-in;
        }
    }
}
</style>
