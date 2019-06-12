<template>
 <section>
     <button class="create">新建</button>
     <button class="open">打开</button>
     <button class="download" @click="download()">下载</button>
 </section>
</template>

<script>
export default {
    methods: {
        download() {
            this.$bus.$emit('downloadImg')
        },
    },
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
// @import '..assets/styles/global';
</style>