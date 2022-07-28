//引入Vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//引入小仓库
import home from './home/index.js'
import search from './search/index.js'
import detail from './detail/index.js'
import shopcart from './shopcart/index.js'
import user from './user/index.js'
import trade from './trade/index.js'
//配置vuex
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade,
    }
})