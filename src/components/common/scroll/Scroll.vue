<!--better-scroll滚动处理-->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    mounted() {
      /*1.创建BScroll对象*/
      this.scroll = new BScroll(this.$refs.wrapper,{
        observeDOM: true,
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      /*2,监听滚动位置*/
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)
      })
      /*下拉加载更多*/
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('pullingUp',() => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      //相对于当前位置偏移滚动 x,y 的距离
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      //结束上拉加载行为
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      //重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      getScrolly() {
        return this.scroll ? this.scroll.y : 0
      }

    }
  }
</script>

<style scoped>

</style>
