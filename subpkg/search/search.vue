<template>
  <view>
    <view class="search-Box">
      <uni-search-bar :focus="true" radius="100" v-model="sv" @input="input" @clear="clear" cancelButton="none">
      </uni-search-bar>
    </view>
    <view class="search-content">
      <view class="content-item" v-for="(item,index) in searchList" :key="index" @click="toGoodsDetail(item)">
        <view class="content-item-left">{{item.goods_name}}</view>
        <uni-icons class="content-item-right" type="forward" size="20"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史区域 -->
    <view class="history-box" v-if="searchList.length === 0">
      <view class="history-top">
        <view class="history-top-left">
          搜索历史
        </view>
        <view class="history-top-right">
          <uni-icons type="trash" size="20" @click="cleanHistory"></uni-icons>
        </view>
      </view>
      <view class="history-content" v-if="historyList.length !== 0">
        <uni-tag :text="n" type="primary" v-for="(n,m) in histories" :key="m"  @click="toGoodsList(n)"/>

      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        sv: '',
        searchList: [],
        historyList: []
      };
    },
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('sv') || '[]')
    },
    methods: {
      input(e) {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.sv = e
          if (e !== "") this.historyList.push(e)

          let set = new Set(this.historyList)
          console.log(set, 'new')
          this.historyList = [...set]
          uni.setStorageSync('sv', JSON.stringify(this.historyList))
          this.getSearchList()
        }, 1500)

      },
      clear(e) {
        console.log(e, 'e')
        this.sv = ''

      },
      cleanHistory() {
        this.historyList = []
        uni.removeStorageSync('sv')
      },
      async getSearchList() {
        if (this.sv === '') return this.searchList = []
        const res = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.sv
        })
        const {
          message,
          meta
        } = res.data
        if (meta.status !== 200 || message.length === 0) return uni.showMsg('暂时没有数据...')
        this.searchList = message
        console.log(this.searchList, 'searchList')
      },
      toGoodsDetail(v) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + v.goods_id
        })
      },
      toGoodsList(v){
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + v
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-Box {
    background-color: #C00000
  }

  .content-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid #efefef;

    .content-item-left {
      flex: 1;
      line-height: 30px;
      font-size: 12px;
      text-overflow: ellipsis; //将文本溢出显示为（…）
      white-space: nowrap; //强制显示为一行
      overflow: hidden;
    }

    .content-item-right {
      width: 20px;
      line-height: 30px;
    }
  }

  .history-top {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    font-size: 12px;
    border-bottom: 1px solid #efefef;
  }

  .history-content {
    display: flex;
    margin-top: 15px;

    .uni-tag {
      margin-left: 5px;
      color: #727072;
      font-size: 12px;
      background-color: #f9f8f9;
    }
  }
</style>
