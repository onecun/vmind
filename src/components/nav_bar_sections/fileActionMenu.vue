<template>
 <section class="file-action">
     <button class="create">
        <span class="icon icon-create"></span>
        <span>新建</span>
     </button>
     <button class="open">
         <span class="icon icon-open"></span>
        <span>打开</span>
     </button>
     <button class="download" @click="download()">
         <span class="icon icon-download"></span>
        <span>下载</span>
     </button>
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

<style lang='scss' rel='stylesheet/scss'>
@import '../../assets/styles/icon.css';

.file-action {
    display: flex;
    width: 15%;
    justify-content: space-around;
    margin-left: 40px;
    * {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #fff;
        color: #303133;
        border: none;
        font-size: 12px;
        cursor: pointer;
    }
}
      
.icon {
    font-size: 26px;
}
</style>