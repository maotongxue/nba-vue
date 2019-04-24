import Vue from 'vue'
import App from './App.vue'
// npm install --save vue-router
import router from './router'
// npm install --save axios vue-axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// npm i element-ui -S
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueAxios, axios)

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render(createElement) {
    return createElement(App)
  }
})
