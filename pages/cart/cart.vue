<template>
  <view>
    <zjh-address></zjh-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>


    <uni-swipe-action>
      <block v-for="(goods, i) in car" :key="i">
        <!-- uni-swipe-action-item 可以为其子节点提供滑动操作的效果。需要通过 options 属性来指定操作按钮的配置信息 -->
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
          <zjh-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :showNum="true"
            @nb-count="changeNumCount"></zjh-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
  import Mixins from '@/mixins/tabbaar-set.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [Mixins],
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    computed: {
      // 将 m_cart 模块中的 cart 数组映射到当前页面中使用
      ...mapState('carInfo', ['car']),
    },
    methods: {
      ...mapMutations('carInfo', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
      // 商品的勾选状态发生了变化
      radioChangeHandler(e) {
        this.updateGoodsState(e) // 输出得到的数据 -> {goods_id: 395, goods_state: false}
      },
      changeNumCount(v) {
        this.updateGoodsCount(v)
      },
      swipeActionClickHandler(goods) {
       this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-title {

    height: 40px;
    display: flex;

    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }
</style>
