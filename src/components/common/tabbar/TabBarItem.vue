<!--底部导航栏组件-->
<template>
  <div class="tab-bar-item" @click='itemcilck'>
    <div v-if='!isActive'>
      <slot name="item-icon"></slot>
    </div>
      <slot v-else name="item-icon-active"></slot>
    <div :style='activeStyle'>
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
     // isActive:true
    }
  },
  computed:{
    isActive(){
      /*indexOf返回调用它的 String 对象中第一次出现的指定值的索引,如果未找到该值，则返回 -1*/
      return this.$route.path.indexOf(this.path)!== -1
    },
    activeStyle(){
      /*根据isActive返回值改变样式*/
      return this.isActive ? {color:this.activeColor} :{}
    }
  },
  methods: {
    /*点击跳转*/
    itemcilck() {
      this.$router.replace(this.path)
    }

  },
 }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>
