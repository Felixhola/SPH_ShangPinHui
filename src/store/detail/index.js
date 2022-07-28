import { reqGoodsInfo ,reqAddOrUpdateShopCart} from "@/api"
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodsInfo: {},
    //获取id
    uuid_token: getUUID(),
}
const mutations = {
    GETGOODSINFO(state, data) {
        state.goodsInfo = data
    }
}
const actions = {
    //获取商品详情的数据
    async getGoodsInfo({ commit }, skuid) {
        const result = await reqGoodsInfo(skuid)
        if(result.code === 200)
        {
            commit('GETGOODSINFO', result.data)
        }
    },
    //将产品添加到购物车中（或者更新某一个产品的数量）
    async addOrUpdateShopCart({ commit }, {skuId, skuNum}) {
        //加入购物车返回的结果
        //发请求，将产品加入到数据库中
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // console.log(result)
        //2：服务器存储成功，进行路由跳转传递参数
        //3：失败，提示用户
        if(result.code == 200){
            return 'Ok'
        }else{
            return Promise.reject(new Error('faile'));
        }
    }
}
//为了简化数据而生
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}