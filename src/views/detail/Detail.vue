<template>
    <div id="detail">
      <detail-nav-bar class="detail-nav"/>
      <scroll class="content" ref="scroll">
        <detail-swiper :topImages="topImages"/>
        <detail-base-info :goods="goods"/>
        <detail-shop-info :shop="shop"/>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
        <detail-param-info :paramInfo="paramInfo"/>
      </scroll>
    </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'

  import {getDetail,Goods,Shop,GoodsParam} from 'network/detail'

  export default {
    name: "Detail",
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
    },
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
      }
    },
    created() {
      //保存传入的iid
      this.iid=this.$route.params.iid;

     //根据iid请求详情数据
      getDetail(this.iid).then(res =>{
        console.log(res)
        /*获取顶部轮播图图片数据*/
        const data=res.result;
        this.topImages = data.itemInfo.topImages;

        /*获取商品信息*/
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services);

        /*获取店铺信息*/
        this.shop = new Shop(data.shopInfo);

        /*获取商品详情数据*/
        this.detailInfo = data.detailInfo;

        /*获取参数信息*/
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 11;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px) ;
  }
</style>
