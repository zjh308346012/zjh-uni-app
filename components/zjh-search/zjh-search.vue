<template>
  <view class="search-box" :style="{'background-color':bgcolor,'position':skty,'top':top,'z-index':9999}" @click="zjhSearch">
    <view class="search-item" :style="{'border-radius':raduis}">
      <uni-icons :type="icon" size="15"></uni-icons>
      <text style="font-size: 14px;">{{tname}}</text>
    </view>


  </view>
</template>

<script>
  export default {
    name: "zjh-search",
    props: {
      bgcolor: {
        type: String,
        default: '#C00000',
      },
      raduis: {
        type: Number,
        default: 18
      },
      tname: {
        type: String,
      },
      icon: {
        type: String,

      },
      skty: {
        type: String,
      },
      top: {
        type: Number,
        default: 0
      }


    },
    data() {
      return {

      };
    },
    methods: {
      zjhSearch() {
        console.log('~~~~')
        this.$emit('zjhClick')
      }
    }
  }
</script>

<style lang="scss">
  .search-box {

    height: 40px;
    background-color: #C00000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;


    .search-item {
      border-radius: 18px;
      background-color: #FFF;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;

    }
  }
</style>
