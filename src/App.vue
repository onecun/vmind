<template>
<div id="app">
    <nav-bar></nav-bar>
    <mind-map></mind-map>
</div>
</template>

<script>
import mindMap from './components/mindMap.vue'
import navBar from './components/navBar.vue'
export default {
    name: 'app',
    components: {mindMap, navBar},
}
</script>
<style>
</style>
