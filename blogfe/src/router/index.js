import Vue from 'vue'
import Router from 'vue-router'
import home from 'components/home'
import login from 'components/login'
import register from 'components/register'
import test from 'components/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/register',
      name: 'register',
      component: register,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },

  ]
})
