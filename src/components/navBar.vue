<template>
<div class="nav-bar-wrapper">
    <file-action-menu></file-action-menu>

    <div class="file-title-wrapper">
        <span class="file-title"
            @click="changeTitle = true" 
            contenteditable="changeTitle">{{ title }}</span>
        
        <!-- <input class="input-title"
            v-show="changeTitleShow" 
            @keydown.enter="changeTitleShow = false"
            v-model="title" type="text" placeholder="输入新标题"> -->

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
        }
    },
    methods: {

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
            color: #67C23A;
            font-size: 22px;
            font-weight: bold;
            &:focus {
                outline: none;
                border-bottom: 2px solid #67C23A;
                transition: border 0.2s ease-in-out;
            }
        }
    }
}
</style>
