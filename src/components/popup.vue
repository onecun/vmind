<template>
<div ref="popup" :style="{top: offsetTop, left: offsetLeft}" class="popup-menu" v-show="show" @click="show = false">
    <button class="add-node" v-on:click="addNode()">
            <span class="icon icon-node"></span>
            <span>添加子节点</span>
        </button>
    <button class="add-brother-node" @click="addBrotherNode()">
            <span class="icon icon-sub-node"></span>
            <span>添加兄弟节点</span>
        </button>
    <button class="delete-node" @click="deleteNode()">
            <span class="icon icon-delete"></span>
            <span>删除</span>
        </button>
    <button class="edit-node" @click="editNode()">
            <span class="icon icon-edit"></span>
            <span>编辑</span>
        </button>
    <button class="toggle-node-tree" @click="toggleNode()">
            <span class="icon icon-unfold"></span>
            <span>显隐子节点</span>
        </button>
</div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            offsetTop: '',
            offsetLeft: '',
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
        editNode() {
            this.$bus.$emit('editNode')
        },
        toggleNode() {
            this.$bus.$emit('toggleNode')
        },

        // 设置点击节点后 popup 出现的位置
        setPopupPosition(event) {
            let ele = event.target
            if (ele.tagName === 'JMNODE') {
                this.show = true
                // console.log(ele.tagName)
                let top = ele.offsetTop
                let left = ele.offsetLeft
                this.offsetTop = top - 60 + 'px'
                this.offsetLeft = left + 'px'
                //
                ele.scrollIntoView({
                    block: 'center',
                    behavior: 'smooth',
                    inline: 'center',
                })
            } else if (ele.tagName !== 'BUTTON' && ele.tagName !== 'SPAN') {
                this.show = false
            }
        },
    },
    mounted() {
        window.addEventListener('mousedown', (event) => {
            this.setPopupPosition(event)
        })
        this.$bus.$on('popup-hide', () => {
            this.show = false
        })
    },
}
</script>

<style lang="scss">
@import '../assets/styles/icon.css';

.popup-menu {
    transition: all 0.2s ease-in-out;
    display: flex;
    position: absolute;
    font-size: 10px;
    height: 60px;
    z-index: 100;
    width: 300px;
    background-color: #fff;
    justify-content: space-around;
    border-radius: 5px;
    box-shadow: 2px 2px 8px rgba($color: #000000, $alpha: 0.4);

    * {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: rgba($color: #000000, $alpha: 0);
        color: #303133;
        border: none;
        cursor: pointer;

        &:hover {
            background: #E4E7ED;
            border-radius: 5px;
        }
    }

}

.icon {
    font-size: 26px;
}

.icon-delete,
.icon-edit,
.icon-unfold {
    font-size: 24px;
}
</style>
