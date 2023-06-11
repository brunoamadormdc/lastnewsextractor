import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import JsonExcel from "vue-json-excel";
import VueWorker from 'vue-worker'
 
Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueWorker)
Vue.use(IconsPlugin)
Vue.component("downloadExcel", JsonExcel);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
