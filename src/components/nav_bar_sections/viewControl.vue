<template>
<section class="view-control">
    <button @mouseover="showSelecter = true"
            @mouseout="showSelecter = false"
             class="theme">
            <span class="icon icon-theme"></span>
            <span>主题</span>
                <div v-show="showSelecter" class="theme-control fadein">
                    <li @click="selectTheme(0)" style="background-color:  #409EFF;"></li>
                    <li @click="selectTheme(1)" style="background-color:  #67C23A;"></li>
                    <li @click="selectTheme(2)" style="background-color:  #E6A23C;"></li>
                    <li @click="selectTheme(3)" style="background-color:  #909399;"></li>
                    <li @click="selectTheme(4)" style="background-color:  #F56C6C;"></li>
                </div>
      </button>
    <button class="unfold-all-nodes">
            <span class="icon icon-unfold-all"></span>
            <span>展开所有节点</span>
      </button>
</section>
</template>

<script>
export default {
    data() {
        return {
            showSelecter: false,
            themes: ['default', 'success', 'warning', 'info', 'danger', ],
        }
    },
    methods: {
        selectTheme(theme) {
            let themeName = this.themes[theme]
            this.$bus.$emit('selectTheme', themeName)
        }
    },

}
</script>

<style lang="scss">
@import '../../assets/styles/global.scss';

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
        outline: none;
    }

    .theme {
        .theme-control {
            position: absolute;
            display: flex;
            flex-direction: column;
            top: 100%;
            width: 100px;
            border: 1px solid #333;
            border-top: none;
            border-radius: 4px;

            li {
                display: inline-block;
                width: 20px;
                height: 20px;
                padding: 3px;
                margin: 3px;
                border-radius: 50%;
            }
        }
    }
}

.icon {
    font-size: 26px;
}
</style>
