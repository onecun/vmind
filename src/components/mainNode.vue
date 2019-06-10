<template>
    <div class="main-node" @click='createNode(node)'>{{ node.topic }}</div>
</template>

<script>
import {createNode} from '../mixin.js'
export default {
    name: 'mainNode',
    props: ['node',],
    mixins: [createNode],
}
</script>

<style lang="scss">

</style>
