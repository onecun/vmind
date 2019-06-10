<template>
<div>
    <div class="node-map" v-for="item in nodes.children" :key='item.id'>
       <subnode :node='item'></subnode>
    </div>
</div>
</template>

<script>
import subnode from './subnode.vue'  
export default {
    name: 'nodeMap',
    components: {
        subnode
    },
    props: ['nodes'],
}
</script>

<style lang="scss">
// @import '..assets/styles/global';
.node-map {
    border: 1px solid #333;
}
</style>
