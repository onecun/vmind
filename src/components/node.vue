<template>
<div class="wrapper">
    <div class="node" @click='createNode(node)'>{{ node.topic }}</div>
    <template v-if="node.children.length !== 0">
        <div class="subnode">
            <div class="recursion" v-for="item in node.children" :key='item.id'>
                <node-map :nodes='[item]'></node-map>
            </div>
        </div>
    </template>
</div>
</template>

<script>
import {createNode} from '../mixin.js'
export default {
    name: 'node',
    props: ['node',],
    mixins: [createNode],
    components: {
        nodeMap: () => import('./nodeMap.vue')
    }
}
</script>

<style lang="scss">
// @import '..assets/styles/global';
// .wrapper {
//     display: flex;
//     align-items: center;
//     background-color: #ccc;
//     flex-direction: row;
// }

// .node {
//     background-color: lightblue;
//     padding: 10px;
//     border-radius: 5px;
//     margin: 5px;
//     cursor: pointer;
//     display: flex;
//     align-items: center;
// }

// .recursion {
//     border: 1px solid #fff;
//     padding: 20px;
// }
</style>
