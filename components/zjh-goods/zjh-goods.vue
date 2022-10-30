<template>
  <view class="goods-list">
    <view class="goods-left">
      <image class="left-image" :src="goods.goods_small_logo" mode="widthFix"></image>
    </view>
    <view class="goods-right">
      <view class="goods-title">
        {{goods.goods_name}}
      </view>
      <view class="goods-content">
        <view class="c-left">￥{{goods.goods_price.toFixed(2)}}</view>
        <view class="c-right">数量：{{goods.goods_number}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"zjh-goods",
    props:{
      goods:{
        type:Object,
        default:{}
      }
    },
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="scss">
 .goods-list {
    display: flex;
    padding: 5px;

    .goods-left {
      width: 100px;
      height: 100px;

      .left-image {
        width: 100%;
        height: 100%;
        margin-right: 4px;
      }
    }

    .goods-right {
      flex: 1;
      padding: 5px;
      box-sizing: border-box;

      .goods-title {
        font-size: 12px;
        font-weight: 700;
        padding: 5px;
        margin-bottom: 20px;
      }

      .goods-content {
        display: flex;
        justify-content: space-between;

        .c-left {
          display: flex;
          align-items: flex-end;
          font-size: 12px;
        }

        .c-right {
          font-size: 12px;
        }
      }
    }
  }
</style>