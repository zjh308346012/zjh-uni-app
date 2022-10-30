import Vue from 'vue'
import App from './App'
import store from './store/store.js'
import {
  $http
} from "@escook/request-miniprogram"
uni.$http = $http
Vue.config.productionTip = false
uni.showMsg = function(title = "数据加载失败...", duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: "none"
  })
}

App.mpType = 'app'

$http.baseUrl = 'https://www.uinav.com'

$http.beforeRequest = function(options) {
  uni.showLoading({
    title: "数据加载中..."
  })
}

$http.afterRequest = function() {
  uni.hideLoading()
}

const app = new Vue({
  ...App,
  store
})

app.$mount()
