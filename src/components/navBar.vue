<template>
<div class="nav-bar-wrapper">
    <file-action-menu></file-action-menu>

    <div class="file-title-wrapper">
        <span @click="changeTitleShow = true" 
            v-show="!changeTitleShow">{{ title }}</span>
        
        <input v-show="changeTitleShow" 
            @keydown.enter="changeTitleShow = false"
            v-model="title" type="text" placeholder="输入新标题">

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
            changeTitleShow: false,
        }
    },
    methods: {

    },
}
</script>

<style lang="scss" scoped>
// @import '..assets/styles/global';
.nav-bar-wrapper {
    position: relative;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #ccc;
}
</style>
