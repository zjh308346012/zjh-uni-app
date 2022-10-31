<template>
  <view class="goods-list">
    <view class="goods-left">
      <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
      <image class="left-image" :src="goods.goods_small_logo" mode="widthFix"></image>
    </view>
    <view class="goods-right">
      <view class="goods-title">
        {{goods.goods_name}}
      </view>
      <view class="goods-content">
        <view class="c-left">￥{{goods.goods_price.toFixed(2)}}</view>
        <uni-number-box :min="1" @change="changeValue" :value="goods.goods_count" v-if="showNum"></uni-number-box>
        <!-- <view class="c-right">数量：{{goods.goods_number ? goods.goods_number :0}}</view> -->

      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "zjh-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
        default: false,
      },
      showNum: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {

      };
    },
    methods: {
      // radio 组件的点击事件处理函数
      radioClickHandler() {
        let {
          goods_id,
          goods_state
        } = this.goods
        // 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
        // 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id,
          // 商品最新的勾选状态
          goods_state: !goods_state
        })
      },
      changeValue(e) {
        let {
          goods_id,
          goods_count
        } = this.goods
        this.$emit('nb-count', {
          goods_id,
          goods_count: +e
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-list {
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;

    .goods-left {
      width: 100px;
      height: 140px;
      margin-right: 5px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex: 1;

      .left-image {
        width: 100px;
        height: 100px;
        display: block;
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
        align-items: center;
        justify-content: space-between;

        .c-left {
          font-size: 16px;
          color: #c00000;
        }

        .c-right {
          font-size: 12px;
        }
      }
    }
  }
</style>
