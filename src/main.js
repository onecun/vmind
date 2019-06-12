import Vue from 'vue'
import App from './App.vue'

const eventBus = new Vue()
Vue.prototype.$bus = eventBus

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
