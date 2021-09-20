<!--中间选择菜单-->
<template>
  <div class="tab-control" >
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabCobtrol",
    props: {
      titles: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        currentIndex:0
      }
    },
    methods: {
      itemclick(index) {
        /*获取当前元素下表并重新赋值*/
        this.currentIndex=index
        /*自定义函数*/
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
