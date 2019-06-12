<template>
    <div ref="popup" class="popup-menu" v-if="show" @click="show = false">
        <button class="add-node" @click="addNode()">添加子节点</button>
        <button class="add-brother-node" @click="addBrotherNode()">添加兄弟节点</button>
        <button class="delete-node">删除</button>
        <button class="edit-node">编辑</button>
        <button class="toggle-node-tree">显隐子节点</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        }
    },
    methods: {
        addNode() {
            this.$bus.$emit('addNode')
        },
        addBrotherNode() {
            this.$bus.$emit('addBrotherNode')
        }
    },
    created() {
        this.$bus.$on('setPosition', (top, left) => {
            this.$refs.popup.style.top = top
            this.$refs.popup.style.left = left
            this.show = true
        })
    }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.popup-menu {
    display: flex;
    position: fixed;
    font-size: 12px;
    height: 40px;
    z-index: 100;
}
</style>