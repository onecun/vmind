<template>
<div class="node-map">
    <div class="first">
       <main-node :node='mainNode'></main-node>
    </div>
    <template v-if="nodes[0].children.length !== 0">
        <div class="subs">
            <div class="sub-node" v-for="item in nodes[0].children" :key='item.id'>
                <node :node='item'></node>
            </div>
        </div>
    </template>
</div>
</template>

<script>
import node from './node.vue'  
import mainNode from './mainNode.vue'  
export default {
    name: 'nodeMap',
    props: ['nodes'],
    components: {
        node,
        mainNode
    },
    data() {
        return {
            mainNode: this.nodes[0]
        }
    },
}
</script>

<style lang="scss">
// @import '..assets/styles/global';
.node-map {
    // border: 1px solid #333;
    display: flex;
    flex-direction: row;
    .first {
        display: flex;
        align-items: center;
        .main-node {
            width: 80px;
            height: 20px;
            padding: 10px;
            background: lightblue;
        }
    }
    .subs {
        display: flex;
        flex-direction: column;
        .sub-node {
            display: flex;
            margin: 5px;
        }
    }
}

.wrapper {
    display: flex;
    align-items: center;
    .node {
        width: 80px;
        height: 20px;
        padding: 10px;
        background-color: lightblue;
    }
}
</style>
