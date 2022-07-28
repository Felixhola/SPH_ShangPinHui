import Vue from 'vue'
import App from './App.vue'
//引入三级组件(全局注册)
import TypeNav from '@/components/TypeNav'
//轮播图
import Carousel from '@/components/Carousel'
//分页器
import Pagination from '@/components/Pagination'

import { Button,MessageBox ,Message,} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
//全局引入element-ui
// import ElementUI from 'element-ui'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
//element-ui，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
// Vue.use(ElementUI)
//引入路由
import router from '@/router/index.js'
//引入store
import store from '@/store/index.js'
Vue.config.productionTip = false
//引入mock数据
import '@/mock/mockServe.js'
//引入swiper
import "swiper/css/swiper.css"

//引入懒加载图片
import VueLazyload from 'vue-lazyload'
import lazy from '@/assets/images/1.gif'
Vue.use(VueLazyload, {
  loading: lazy
})

// 引入本人封装的大写字母插件 （自定义插件）（小写变大写）
import myPlugins from '@/plugins/myPlugins.js'
Vue.use(myPlugins,{
  name:'myPlugins'
})

// 引入表单验证插件
import validate from '@/plugins/validate.js'
// //测试
// import {reqCategoryList} from '@/api/index.js'
// reqCategoryList();
//测试
// import {reqGetSearchInfo} from '@/api/index.js'
// console.log(reqGetSearchInfo({}))
//全局引入api
import * as API from '@/api/index.js'
new Vue({
  render: h => h(App),
  //注册全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册store
  store
}).$mount('#app')
