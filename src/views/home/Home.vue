<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-cobtrol
      :titles="['流行','新款','精选']"
      @tabClick="tabClick"
      ref="TabCobtrol1"
      v-show="isTabFixed"
      class="tab-cobtrol"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banner="banner" @swiperImageLode="swiperImageLode"/>
      <recommend-view :recommend="recommend"/>
      <feature-view/>
      <tab-cobtrol
        :titles="['流行','新款','精选']"
        @tabClick="tabClick"
        ref="TabCobtrol2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <!--native使组件可以点击-->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';

import TabCobtrol from "components/content/tabCobtrol/TabCobtrol";
import GoodsList from 'components/content/goods/GoodsList';
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import {getHomeMultidata,getHomeGoods} from "network/home";

import {debounce} from "common/utils"


export default {
  name: 'home',
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        sell: {page: 0,list:[]},
        pop: {page: 0,list:[]},
        new: {page: 0,list:[]}
      },
      currentType: 'sell',
      isShowBackTop: true,
      topOffsetTop: 0,
      isTabFixed: false,
      savey: 0
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
      }
  },
  components: {
    NavBar,
    Scroll,
    TabCobtrol,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  /*created在实例创建完成后被立即同步调用*/
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods('sell')
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
  },
  /*mounted实例被挂载后调用*/
  mounted() {
    //监听item 图片加载完成
    const refresh=debounce(this.$refs.scroll.refresh,300)
    this.$bus.$on('itemImageLoad',() =>{
      refresh()
    })
  },
  /*destroyed实例销毁后调用*/
  destroyed() {
    console.log('home destroyed')
  },
  /*activated被keep-alive 缓存的组件激活时调用,该钩子在服务器端渲染期间不被调用*/
  activated() {
    this.$refs.scroll.scrollTo(0 ,this.savey, 1);
    this.$refs.scroll.refresh()
  },
  /*deactivated被keep-alive缓存的组件失活时调用,该钩子在服务器端渲染期间不被调用*/
  deactivated() {
    this.savey=this.$refs.scroll.getScrolly()
    console.log('deactivated'+this.savey)
  },
  methods: {
    /*事件监听相关方法*/
    /*获取导航条下标,切换路径请求数据*/
    tabClick(index){
      switch (index) {
        case 0:
          this.currentType='sell'
          break
        case 1:
          this.currentType='pop'
          break
        case 2:
          this.currentType='new'
          break
      }
       this.$refs.TabCobtrol1.currentIndex=index
       this.$refs.TabCobtrol2.currentIndex=index
    },
    /*ref被用来给元素或子组件注册引用信息*/
    /*点击组件回到顶部*/
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position) {
      /*scrollTo y轴大于1000显示*/
      this.isShowBackTop=(-position.y)>1000
      /*tab-cobtrol 到达指定位置显示*/
      this.isTabFixed=(-position.y)>this.topOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.refresh()
    },
    swiperImageLode() {
      this.topOffsetTop=this.$refs.TabCobtrol2.$el.offsetTop
    },
    /*网络请求相关方法*/
    getHomeMultidata() {
      getHomeMultidata().then(res =>{
        this.banner=res.data.banner.list;
        this.recommend=res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page=this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        this.$refs.scroll.finishPullUp()
      })
    }
  }

}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
 }
  .content {
    overflow: hidden;
    position: absolute;
    bottom: 49px;
    top: 44px;
  }
  .tab-cobtrol {
    position: relative;
    z-index: 9;
    left: 0;
    right: 0;
    top: 44px;
  }

</style>
