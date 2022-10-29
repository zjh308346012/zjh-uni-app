<template>
  <view>
    <zjh-search @zjhClick="homeSearch" :skty="'sticky'" :top="0" :bgcolor="'#000'" :raduis="18" :tname="'搜索'"
      :icon="'search'"></zjh-search>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <img :src="item.image_src" alt="">
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航栏区域 -->
    <view class="nav_list">
      <view class="nav_list_item" v-for="(item,index) in navList" :key="index" @click="getNavInfo(item)">
        <image :src="item.image_src" mode="" class="item-image"></image>
      </view>
    </view>
    <!-- 具体区域 -->
    <view class="floor_list">
      <view class="floor_item" v-for="(v,i) in floorList" :key="i">
        <image :src="v.floor_title.image_src" class="floor-title" mode=""></image>
        <view class="floor_box">
          <view class="floor_f">
            <navigator :url="v.product_list[0]['url']">
              <image :src="v.product_list[0]['image_src']" mode="" class="floor_f_image"></image>
            </navigator>

          </view>
          <view class="floor_c">
            <view v-for="(n,m) in v.product_list" :key="m" class="floor_c_item">
              <navigator :url="n.url">
                <image v-if="m !== 0" :src="n.image_src" mode="widthFix" :style="{width:(n.image_width - 15) + 'rpx'}">
                </image>
              </navigator>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList();
      this.getNavList();
      this.getFloorList()
    },
  
    onLoad() {
      this.getSwiperList();
      this.getNavList();
      this.getFloorList()
    },
    methods: {
       homeSearch(){
         uni.navigateTo({
           url:'/subpkg/search/search'
         })
       },
      async getSwiperList() {
        const res = await uni.$http.get('/api/public/v1/home/swiperdata')
        const {
          data
        } = res
        if (data.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swiperList = data.message
      },
      async getNavList() {
        const res = await uni.$http.get('/api/public/v1/home/catitems')
        const {
          message,
          meta
        } = res.data
        if (meta.status !== 200) return uni.$showMsg()
        this.navList = message
      },
      //获取分类信息
      getNavInfo(info) {
        const {
          image_src,
          name,
          navigator_url,
          open_type
        } = info

        if (name == '分类' && open_type == 'switchTab') {
          uni.switchTab({
            url: '/pages/catr/catr'
          })
        }
      },
      //获取下方的列表
      async getFloorList() {
        const res = await uni.$http.get('/api/public/v1/home/floordata')
        const {
          message,
          meta
        } = res.data
        if (meta.status !== 200) return uni.$showMsg()
        message.forEach(item => {
          item.product_list.forEach(k => {
            k.url = '/subpkg/goods_list/goods_list?' + k.navigator_url.split('?')[1]
          })
        })
        this.floorList = message

      }
    }
  }
</script>

<style lang="scss">
  //轮播图区域
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  //分类区域
  .nav_list {
    display: flex;
    justify-content: space-around;

    .nav_list_item image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor_list {
    margin: 15rpx;

    .floor-title {
      width: 100%;
      height: 60rpx;
    }

    .floor_box {
      display: flex;
      padding: 5rpx;
      height: 480rpx;

      .floor_f {
        .floor_f_image {
          width: 232rpx;
        }
      }

      .floor_c {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .floor_c_item {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }
</style>
