import Vue from 'vue'
import Router from 'vue-router'
import register from '../views/RegisterComponent.vue'
import container from '../views/ContainerComponent.vue'


Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        
      {
        path: '/',
        name: 'register',
        component: register
      },
      {
        path: '/container',
        name: 'container',
        component: container
      }
    ]
  })
  
  
  export default router