import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/index'
import Dashboard from '@/view/dashboard/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
  ]
})
