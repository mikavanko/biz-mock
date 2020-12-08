import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import router from './router'
import {store} from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(Vuex);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// import 'materialize-css/dist/css/materialize.css'
// import 'material-design-icons/iconfont/material-icons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')