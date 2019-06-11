<template>
<span>
    <popup :node='node' v-if="popupDisplay"></popup>
    <div class="main-node" @click='showPopup()' @blur="hidePopup()">{{ node.topic }}</div>
</span>
</template>

<script>
import popup from './popup.vue'
export default {
    name: 'mainNode',
    props: ['node',],
    components: {popup},
    data() {
        return {
            popupDisplay: false,
        }
    },
    methods: {
        showPopup() {
            this.popupDisplay = true
        },
        hidePopup() {
            this.popupDisplay = false
        }
    },
}
</script>

<style lang="scss">

</style>
