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
    },
    // 更新购物车中商品的勾选状态
    updateGoodsState(state, goods) {
      console.log(goods, 'goods', state.car)
      // 根据 goods_id 查询购物车中对应商品的信息对象
      const findResult = state.car.find(x => x.goods_id === goods.goods_id)
      console.log(findResult, 'findResult')
      // 有对应的商品信息对象
      if (findResult) {
        // 更新对应商品的勾选状态
        findResult.goods_state = goods.goods_state
        // 持久化存储到本地
        this.commit('carInfo/saveStorage')
      }
    },
    updateGoodsCount(state, count) {
      const findCount = state.car.find(x => x.goods_id === count.goods_id)
      if (findCount) {
        findCount.goods_count = count.goods_count
        this.commit('carInfo/saveStorage')
      }

    },
    removeGoodsById(state, goods_id) {
      // 调用数组的 filter 方法进行过滤
      state.car = state.car.filter(x => x.goods_id !== goods_id)
      // 持久化存储到本地
      this.commit('carInfo/saveStorage')
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
