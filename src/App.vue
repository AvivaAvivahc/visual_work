<template>
  <div id="app">
    <!--Keep-Alive功能避免了建立或者重新建立连接-->
    <!--exclude="Detail"不需要缓存-->
    <!--<router-view/>加载组件-->
     <keep-alive exclude="Detail">
       <router-view/>
     </keep-alive>
     <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar';

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
