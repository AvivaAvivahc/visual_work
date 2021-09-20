import Vue from 'vue';
import VueRouter from 'vue-router';

// 解决导航栏或者底部导航tabBar中的vue-router在3.0版本以上频繁点击菜单报错的问题。
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}

const Home = () => import ('../views/home/Home.vue');
const Cate = () => import ('../views/cate/Cate.vue');
const Shopcart = () => import ('../views/shopcart/Shopcart.vue');
const Profile = () =>  import ('../views/profile/Profile.vue');
const Detail = () =>  import ('../views/detail/Detail.vue');

Vue.use(VueRouter);

const routes=[
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/cate',
    component: Cate
  },
  {
    path: '/shopcart',
    component: Shopcart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  /*请求模式为history*/
  mode: 'history'
})

export default router
