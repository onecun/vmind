<template>
<main class="main-wrapper">
    <node-map :nodes='nodes'></node-map>
</main>
</template>

<script>
import nodeMap from './nodeMap.vue'

export default {
    components: {nodeMap},
    data() {
        return {
            'subRight': [],
            'subLeft': [],
            'nodes': this.$store.state.node
        }
    },
}
</script>

<style lang='scss' rel='stylesheet/scss'>
// @import '..assets/styles/global';
.main-wrapper {
}
</style>