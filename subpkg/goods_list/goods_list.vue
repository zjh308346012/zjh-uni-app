<template>
  <view>
    <view v-for="(item,index) in goodsList" :key="index" @click="toGoodsDetail(item)">
      <zjh-goods :goods="item"></zjh-goods>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total: 0,
        isLoading: false
      };
    },
    onLoad(options) {
      console.log(options, 'options')
      let {
        query,
        cid
      } = options
      this.queryObj.query = query || ''
      this.queryObj.cid = cid || ''
      this.getList()
    },
    onReachBottom() {
      if (this.isLoading) return
      this.queryObj.pagenum += 1
      this.getList()

    },
    onPullDownRefresh() {
      this.formatData()
      this.getList(() => uni.stopPullDownRefresh())
    },
    methods: {
      async getList(cb) {
        this.isLoading = true
        const res = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isLoading = false
        const {
          message,
          meta
        } = res.data
        if (meta.status !== 200) return uni.showMsg('数据加载失败~~')
        if (message.goods.length === 0) return uni.showMsg('数据加载完毕~~')
        console.log(message, 'message')
        this.goodsList = [...this.goodsList, ...message.goods]
        this.total = message.total
        cb && cb()
      },
      formatData() {
        this.queryObj.pagenum = 1;
        this.goodsList = [];
        this.total = 0;
        this.isLoading = false
      },
      toGoodsDetail(v) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + v.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
