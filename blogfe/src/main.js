// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 开发跨域
import axios from 'axios'
axios.defaults.withCredentials=true;

axios.defaults.baseURL = 'http://localhost:2080'
Vue.prototype.$http = axios

Vue.prototype.$msg = (type, msg) => {
  Vue.prototype.$message({
    type: type,
    message: msg
  })
}

// 请求拦截
axios.interceptors.request.use(config =>{
  return config
}, err => {
  return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use( res=>{
  console.log(res)
  if(res.data&&res.data.err){
    Vue.prototype.$msg('error', res.data.err)
    return Promise.reject(res.data.err)
  }else if(res.data.redirect){
    Vue.prototype.$msg('warning', '需要登录')
    window.location.href = "#/" //跳转到登录页
    return Promise.reject(res)
  }else{
    return res
  }
},err =>{
  console.log(err)
  return Promise.reject(err)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
