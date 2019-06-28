<template>
    <div ref="popup" class="popup-menu" v-show="show" @click="show = false">
        <button class="add-node" @click="addNode()">添加子节点</button>
        <button class="add-brother-node" @click="addBrotherNode()">添加兄弟节点</button>
        <button class="delete-node" @click="deleteNode()">删除</button>
        <button class="edit-node">编辑</button>
        <button class="toggle-node-tree" @click="toggleNode()">显隐子节点</button>
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
        },
        deleteNode() {
            this.$bus.$emit('deleteNode')            
        },
        toggleNode() {
            this.$bus.$emit('toggleNode')
        },
    },
    created() {
        this.$bus.$on('setPosition', (isShow, top, left) => {
            this.show = isShow
            this.$refs.popup.style.top = parseInt(top) - 40 + 'px'
            this.$refs.popup.style.left = left
        })
    }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.popup-menu {
    display: flex;
    position: absolute;
    font-size: 8px;
    height: 40px;
    z-index: 100;
    width: 300px;
    background-color: #fff;
    justify-content: space-around;
    border-radius: 5px;
    box-shadow: 2px 2px 1px rgba($color: #000000, $alpha: 0.2);
    * {
        background: rgba($color: #000000, $alpha: 0);
        color: #303133;
        border: none;
        cursor: pointer;
        &:hover {
            background: #85ce61;
            border-radius: 5px;
        }
    }

}
</style>