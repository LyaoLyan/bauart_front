import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router/router.js'
import store from './store/index.js'
import style from './assets/style/style.css'
Vue.use(Vuex)


new Vue({
  el: '#app',
   router, store, style,
  render: h => h(App)
})


