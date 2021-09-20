<!--商品展示列表-->
<template>
  <div class="goods-item" @click="itemClick">
    <!--@load事件会图像加载完成后立即发生-->
    <img :src="goodsitem.show.img" @load="imageLoad">
    <div class="goods-info">
      <P>{{goodsitem.title}}</P>
      <span class="price">{{goodsitem.price}}</span>
      <span class="cfav">{{goodsitem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsitem: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
      },
      /*路由跳转并传递iid*/
      itemClick() {
        this.$router.push('/detail/'+this.goodsitem.iid)

      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .cfav {
    position: relative;
  }

  .goods-info .cfav::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
