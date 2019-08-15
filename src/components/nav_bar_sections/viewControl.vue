<template>
<section class="view-control">
    <button @mouseover="showSelecter = true" @mouseout="showSelecter = false" class="theme">
        <span class="icon icon-theme"></span>
        <span>主题</span>
        <div v-show="showSelecter" class="theme-control fadein">
            <div @click="selectTheme(0)" class="theme-item">
                <li style="background-color:  #409EFF;"></li>
            </div>
            <div @click="selectTheme(1)" class="theme-item">
                <li style="background-color:  #67C23A;"></li>
            </div>
            <div @click="selectTheme(2)" class="theme-item">
                <li style="background-color:  #E6A23C;"></li>
            </div>
            <div @click="selectTheme(3)" class="theme-item">
                <li style="background-color:  #909399;"></li>
            </div>
            <div @click="selectTheme(4)" class="theme-item">
                <li style="background-color:  #F56C6C;"></li>
            </div>
        </div>
    </button>
    <button class="unfold-all-nodes" @click="unfoldAllNodes()">
        <span class="icon icon-unfold-all"></span>
        <span v-if="!unfold">展开所有</span>
        <span v-else>收起所有</span>
    </button>
</section>
</template>

<script>
export default {
    data() {
        return {
            showSelecter: false,
            themes: ['primary', 'success', 'warning', 'info', 'danger', ],
            unfold: false,
        }
    },
    methods: {
        selectTheme(theme) {
            let themeName = this.themes[theme]
            this.$bus.$emit('selectTheme', themeName)
        },
        unfoldAllNodes() {
            this.unfold = !this.unfold
            this.$bus.$emit('unfoldAllNodes', this.unfold)
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

            .theme-item {
                width: 100%;

                &:hover {
                    background: #F2F6FC;
                }

                li {
                    display: inline-block;
                    width: 18px;
                    height: 18px;
                    padding: 2px;
                    margin: 3px;
                    border-radius: 50%;
                }

            }
        }
    }
}

.icon {
    font-size: 26px;
}
</style>
