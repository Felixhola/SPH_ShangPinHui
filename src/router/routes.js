//引入路由相关的配置项
// import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import MyOrder from '@/views/Center/myOrder'
import GroupOrder from '@/views/Center/groupOrder'
export default
    [
        {
            path: "/detail/:skuid",
            component: Detail,
            meta: { show: true }
        },
        {
            path: "/center",
            component: Center,
            meta: { show: true },
            children: [
                {
                    path: "myOrder",
                    component: MyOrder,
                    meta: { show: true }
                },
                {
                    path: "groupOrder",
                    component: GroupOrder,
                    meta: { show: true }
                },
                //路由重定向
                {
                    path: "/center",
                    redirect: "/center/myOrder"
                }
            ]
        },
        {
            path: "/paysuccess",
            component: PaySuccess,
            meta: { show: true }
        },
        {
            path: "/pay",
            component: Pay,
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                if(from.path === "/trade" || from.path === "/pay"){
                    next()
                }else{
                    //从哪来，回哪去
                    next(false)
                }
            }
        },
        {
            path: "/trade",
            component: Trade,
            meta: { show: true },
            //路由独享守卫
            beforeEnter: (to, from, next) => {
                if(from.path === "/shopcart" || from.path === "/trade"){
                    next()
                }else{
                    //从哪来，回哪去
                    next(false)
                }
            }
        },
        {
            path: "/shopcart",
            component: ShopCart,
            meta: { show: true }
        },
        {
            path: '/addcartsuccess',
            component: AddCartSuccess,
            //路由元信息,控制当前路由是否需要Footer组件
            meta: { show: true },
        },
        {
            path: "/home",
            component: () => import('@/views/Home'),
            meta: { show: true }
        },
        {
            path: "/login",
            component: Login,
            meta: { show: false }
        },
        {
            path: "/register",
            component: Register,
            meta: { show: false }
        },
        {
            path: "/search/:keyword?",
            component: Search,
            meta: { show: true },
            name: 'search'
        },
        {
            path: "*",
            redirect: "/home",
            meta: { show: true }
        }
    ]
