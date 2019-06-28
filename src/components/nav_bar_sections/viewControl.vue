<template>
  <section class="view-control">
      <button class="theme">
          <span class="icon icon-theme"></span>
        <span>主题</span>
      </button>
      <button class="unfold-all-nodes">
          <span class="icon icon-unfold-all"></span>
        <span>展开所有节点</span>
      </button>
  </section>
</template>

<script>
export default {

}
</script>

<style lang='scss' rel='stylesheet/scss'>
.view-control {
    display: flex;
    width: 10%;
    justify-content: space-around;
    margin-right: 40px;
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