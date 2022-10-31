import Vue from 'vue'
import Vuex from 'vuex'
import carInfo from './car.js'
import userInfo from './user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    carInfo,
    userInfo
  }
})

export default store
