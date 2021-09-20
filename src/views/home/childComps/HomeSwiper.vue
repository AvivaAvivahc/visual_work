<template>
  <swiper>
    <swiper-item v-for="item in banner">
      <a :href="item.link"></a>
      <img :src="item.image"  @load="imageLode">
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper,SwiperItem} from "components/common/swiper"

  export default {
    name: "HomeSwiper",
    data() {
      return{
        isLoad: false
      }
    },
    props: {
      banner: {
        type:Array,
        default() {
          return[]
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLode() {
        if(!this.isLoad) {
          this.$emit('swiperImageLode')
          this.isLoad=true
        }
      }
    }
  }
</script>

<style scoped>

</style>
