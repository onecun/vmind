<template>
<div class="message-box-wrapper fadein">
    <div class="mask"></div>
    <section class="message-box">
        <div class="message-box-header">
            <div class="message-box-title">提示</div>
        </div>
        <div class="message-box-content">
            <slot></slot>
        </div>
        <div class="message-box-control">
            <button @click="cancel()" class="message-box-cancel btn btn-small">取消</button>
            <button @click="confirm()" class="message-box-confirm btn btn-small btn-primary">确定</button>
        </div>
    </section>
</div>
</template>

<script>
export default {
    methods: {
        cancel() {
            this.$emit('cancel')
        },
        confirm() {
            this.$emit('confirm')
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/global.scss';

.mask {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.5;
}

.message-box-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: rgba($color: #000000, $alpha: 0) !important;
}

.message-box {
    z-index: 201;
    display: inline-block;
    width: 420px;
    padding-bottom: 10px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #EBEEF5;
    font-size: 18px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: left;
    overflow: hidden;
    backface-visibility: hidden;

    .message-box-header {
        position: relative;
        padding: 15px;
        padding-bottom: 10px;
        .message-box-title {
            padding-left: 0;
            margin-bottom: 0;
            font-size: 18px;
            line-height: 1;
            color: #303133;
        }
    }

    .message-box-content {
        position: relative;
        padding: 10px 15px;
        color: #606266;
        font-size: 14px;

        * {
            color: #606266;
            font-size: 14px;
            padding-left: 36px;
            padding-right: 12px;
            margin: 0;
            line-height: 24px;
        }
    }

    .message-box-control {
        padding: 5px 15px 0;
        text-align: right;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .message-box-confirm {
            margin-left: 10px;
        }
    }
}
</style>
