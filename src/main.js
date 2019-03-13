// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VideoPlayer from 'vue-video-player'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont.css'
import Axios from 'axios'

let baseUrl = ''
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api'
} else {
  baseUrl = 'https://baobab.kaiyanapp.com'
}

console.log(baseUrl)

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = baseUrl
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Vue.use(VideoPlayer)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
