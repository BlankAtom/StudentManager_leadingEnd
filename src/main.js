import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import store from "./store";

import * as echarts from 'echarts'
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts



new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
