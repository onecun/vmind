<template>
  <div class="button-wrapper">
      <div class="add-child" @click="createNode(node)">添加子节点</div>
      <div class="add-brother">添加兄弟节点</div>
      <div class="delete">删除</div>
      <div class="edit">编辑</div>
      <div class="toggle">显隐子节点</div>
  </div>
</template>

<script>
import {createNode} from '../mixin.js'
export default {
    mixins: [createNode],
    props: ['node'],
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
// @import '..assets/styles/global';
.button-wrapper {
    display: flex;
    font-size: 12px;
    padding: 4px;
    background-color: #f5f5f5;
    border: 1px solid #333;
    border-radius: 3px;
    z-index: 100px;
    margin: 2px;
    box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.1);
    * {
        margin: 2px;
    }
}
</style>