<template>
<main class="main-wrapper">
    <div class="left">
        <div v-for="i in subLeft" :key="i">
            <subnode topic='新建节点'></subnode>
        </div>
    </div>
    <div class="main-node" @click="init()">
        <div>主节点</div>
    </div>
    <div class="right">
        <div v-for="{item, index} in subRight" :key="index">
            <div>
                <subnode :node="item"></subnode>
            </div>
        </div>
    </div>
</main>
</template>

<script>
import subnode from './subnode.vue'

export default {
    components: {subnode},
    data() {
        return {
            'subRight': [],
            'subLeft': [],
        }
    },
    methods: {
        init() {
            this.creatNode(this.$store.state.node)
        },
        creatNode(parent) {
            const getChild = function(number, id) {
                console.log(number, id)
                let child = {
                    'expanded': true,
                    'topic': '新建节点',
                    'id': `${id}-${number + 1}`,
                    'children': [],
                    'childNumber': 0,
                }
                return child
            }

            const findChildren = function(id, node) {
                let arr =  id.split('-')
                let children = node.children
                for (let i = 1; i < arr.length; i++) {
                    children = children[Number(arr[i]) - 1]
                }
                return children
            }
            
            let child = getChild(parent.childNumber, parent.id)
            this.subRight.push(child)
            let children = findChildren(parent.id, this.$store.state.node)
            this.$store.dispatch('add_children', [child, children])

            
        }
    },

}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
// @import '..assets/styles/global';
.main-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    .main-node {
        background-color: lightblue;
        padding: 10px;
        border-radius: 5px;
        margin: 5px;
        cursor: pointer;
    }
}


</style>