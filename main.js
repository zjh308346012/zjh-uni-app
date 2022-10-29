import Vue from 'vue'
import App from './App'

import {
  $http
} from "@escook/request-miniprogram"
uni.$http = $http
Vue.config.productionTip = false


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
  ...App
})

app.$mount()


