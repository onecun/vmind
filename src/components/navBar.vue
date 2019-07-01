<template>
<div class="nav-bar-wrapper">
    <file-action-menu :title="title"></file-action-menu>

    <div class="file-title-wrapper">
        <span class="file-title"
            @click="changeTitle = true">
            <span ref="fileTitle" v-show="!changeTitle">
                {{ title }}
            </span>

        <input class="input-title"
                v-if="changeTitle"
                v-focus 
                @keydown.enter="changeTitle = false"
                @blur="changeTitle = false"
                :style="{width: inputWidth}"
                v-model="title" type="text" placeholder="输入新标题">
        </span>

    </div>

    <view-control></view-control>
</div>
</template>

<script>
import fileActionMenu from './nav_bar_sections/fileActionMenu'
import viewControl from './nav_bar_sections/viewControl'
export default {
    components: {
        fileActionMenu,
        viewControl,
    },
    data() {
        return {
            title: '未命名标题',
            changeTitle: false,
            inputWidth: '150px',
        }
    },
    updated() {
        let width = this.$refs.fileTitle.offsetWidth
        if (width) {
            this.inputWidth = width + 'px'
        }
    },
    directives: {
        focus: {
            // 指令的定义
            inserted: function (el) {
                el.focus()
            }
        }
    },
}
</script>

<style lang="scss" scoped>
.nav-bar-wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    z-index: 100;
    border-bottom: 1px solid #E4E7ED;
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.2);

    .file-title-wrapper {
        .file-title {
            color: #303133;
            font-size: 22px;
        }

        .input-title {
            -webkit-appearance: none;
            color: #303133;
            background-color: #fff;
            background-image: none;
            border-radius: 4px;
            border: 1px solid #DCDFE6;
            display: inline-block;
            font-size: inherit;
            height: 40px;
            line-height: 40px;
            outline: none;
            padding: 0 15px;
            transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
            width: 100%;
        }
    }
}
</style>
