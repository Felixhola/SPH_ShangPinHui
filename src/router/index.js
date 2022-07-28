//配置路由
//第一步：引入插件、安装插件
import VueRouter from "vue-router";
import Vue from "vue";
import store from "../store/index.js";
Vue.use(VueRouter);
//引入路由相关的配置项
import routes from './routes'

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//解决编程式路由跳转到当前路由的报错


VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//自动跳转到每个页面的顶部
let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //to:要跳转的路由对象
    //from:当前路由对象
    //next:下一步，放行
    //面试题:如何获取当前路由的meta属性?
    //面试题:如何获取当前路由的name属性?
    //面试题:如何获取当前路由的path属性?
    //面试题:如何获取当前路由的fullPath属性?
    //面试题:如何获取当前路由的query属性?
    //面试题:如何获取当前路由的params属性?
    //面试题:如何获取当前路由的hash属性?
    //面试题:如何获取当前路由的matched属性?
    //next的几种写法
    //next() //放行  next('/') //跳转到指定路由 next({ path: '/' }) //跳转到指定路由  next(false) //不放行
    //打印
    // console.log(to)
    // console.log(from)
    // next()
    let token = store.state.user.token
    let userName = store.state.user.userInfo.name
    //如果token存在，则说明已经登录
    if (token) {
        //如果跳转路由是登录页面或者是注册页面，则跳转到首页
        if (to.path === '/login'||to.path === '/register') {
            // next({ path: '/' })
            next('/home')
        } else {
            //已经登陆了，但是不是跳转到登录页面
            if (userName) {
                //如果用户名存在，则说明有用户信息
                next()
            } else {
                //没有用户信息，派发action获取用户信息
                try {
                    //获取用户信息
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    //没有用户信息，但是有token，说明token过期了，需要重新获取，所以需要重新登陆
                    //首先删除本地存储的token
                    await store.dispatch('userLogout')
                    //跳转到登录页面
                    next({ path: '/login' })
                }
            }
        }
    } else {
        //如果token不存在，则说明没有登录
        // next()
        let toPath = to.path
        if(toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1 || toPath.indexOf('/trade')!=-1){
            next({ path: '/login?redirect='+toPath })
        }
        else{
            next()
        }
    }
})

export default router;