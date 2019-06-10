<template>
<div class="wrapper">
    <div class="subnode" @click='creatNode(node)'>{{ node.topic }}</div>
    <div class="digv" v-for="item in node.children" :key='item.id'>
        <subnode :node='item'></subnode>
    </div>
</div>
</template>

<script>
export default {
    name: 'subnode',
    props: ['node'],
    data() {
        return {
            subNode: [],
        }
    },
    methods: {
        creatNode(parent) {
            console.log(parent)
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
                    children = children[Number(arr[i]) - 1].children
                }
                return children
            }

            let child = getChild(parent.childNumber, parent.id)
            this.subNode.push(child)
            parent.childNumber++
            let children = findChildren(parent.id, this.$store.state.node)
            console.log('lalal', children)
            this.$store.dispatch('add_children', [child, children])
        }
    }
}
</script>

<style lang='scss' rel='stylesheet/scss'>
// @import '..assets/styles/global';
.wrapper {
    display: flex;
    align-items: center;
    background-color: #ccc;
}
.subnode {
    background-color: lightblue;
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.digv {
    border: 1px solid #fff;
    padding: 20px;
}
</style>