import Vue from 'vue'
import Vuex from 'vuex'
import carInfo from './car.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    carInfo
  }
})

export default store
