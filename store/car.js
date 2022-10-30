export default {
  namespaced: true,
  state: () => ({
    car: JSON.parse(uni.getStorageSync('car') || '[]') 
  }),
  mutations: {
    addToCar(state, goods) {
      const isCarInfo = state.car.find(item => item.goods_id === goods.goods_id)
      if (!isCarInfo) {
        state.car.push(goods)
      } else {
        isCarInfo.goods_count++
      }
      this.commit('carInfo/saveStorage')
    },
    saveStorage(state) {
      uni.setStorageSync('car', JSON.stringify(state.car))
    }
  },
  getters: {
    total(state) {
      let c = 0
      // 循环统计商品的数量，累加到变量 c 中
      state.car.forEach(goods => c += goods.goods_count)
      return c
    }

  }
}
