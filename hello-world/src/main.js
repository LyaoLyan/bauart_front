import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import users from './assets/users.json'
import router from './router/router.js'
import colors from './assets/colors.json'
import store from './store/index.js'

Vue.use(Vuex)


new Vue({
  el: '#app',
   router, store,
  render: h => h(App)
})


console.log("dfesfsf");
if (!localStorage.getItem('firstLoadDone')) {
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('colors', JSON.stringify(colors));
  localStorage.setItem('firstLoadDone', true);
}
// localStorage.setItem('users', JSON.stringify(users));
// localStorage.setItem('colors', JSON.stringify(colors));



