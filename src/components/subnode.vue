<template>
  <div class="subnode">{{ topic }}</div>
</template>

<script>
export default {
    props: ['node'],
   
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
// @import '..assets/styles/global';
.subnode {
    background-color: lightblue;
    padding: 10px;
    border-radius: 5px;
    margin: 5px;
    cursor: pointer;
}
</style>