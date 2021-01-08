import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  createProvider
} from './vue-apollo'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/black-green-light.css'
// import {
//   apollo
// } from "./apollo"
Vue.use(VueMaterial)
Vue.config.productionTip = false



new Vue({
  store,
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')