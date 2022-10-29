<template>
    <zjh-search @zjhClick="zjhClick"  :bgcolor="'#000'" :raduis="18"  :tname="'搜索'" :icon="'search'"></zjh-search>
    <view class="scrool-view-container">
      <!-- 左侧滑动区域 -->
      <scroll-view scroll-y="true" class="left-scrool" :style="{height:wh + 'px'}">
        <block v-for="(item,index) in cateList" :key="index">
          <view :class="['left-scroll-item',index=== active ? 'active' :'']" @click="isActive(index)">{{item.cat_name}}
          </view>
        </block>

      </scroll-view>
      <!-- 右侧滑动区域 -->
      <scroll-view scroll-y="true" :style="{height:wh + 'px'}" :scroll-top="scrollTop">
        <view class="right-scroll-item" v-for="(v,i) in cateListc" :key="i">
          <view class="right-item-title">
            /{{v.cat_name}}/
          </view>
          <view class="right-item-content">
            <view class="cBox" v-for="(c,k) in v.children" :key="k" @click="goCateList(c)">
              <image :src="c.cat_icon.replace('dev','web')" mode="widthFix"></image>
              <text>
                {{c.cat_name}}
              </text>
            </view>
          </view>
        </view>

      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {

    data() {
      return {
        wh: 0,
        cateList: [],
        active: 0,
        cateListc: [],
        scrollTop: 0
      }
    },
    methods: {
      async getCateList() {
        const res = await uni.$http.get('/api/public/v1/categories')
        const {
          message,
          meta
        } = res.data
        this.cateList = message
        this.cateListc = message[0]['children']
      },
      isActive(i) {
        this.active = i
        this.cateListc = this.cateList[i]['children']
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      goCateList(v) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?cid=' + v.cat_id
        })
      },
      zjhClick(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
        console.log('ok')
      }
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      console.log(sysInfo)
      this.wh = sysInfo.windowHeight - 50
      this.getCateList();

    }
  }
</script>

<style lang="scss">
  .scrool-view-container {
    margin-top: 0;
    display: flex;
    padding: 5rpx;
  }

  .left-scrool {
    width: 120px;
  }

  .left-scroll-item {
    width: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 12px;

    &.active {
      background-color: #fff;
      position: relative;

      &::before {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        content: '';
        display: block;
        width: 3px;
        background-color: #C00000;
        height: 30px;
      }
    }

  }

  .right-item-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  .right-item-content {
    display: flex;
    flex-wrap: wrap;

    .cBox {
      width: 33.33%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px 0;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>
