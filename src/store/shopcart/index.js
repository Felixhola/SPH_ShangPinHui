import { reqCartList, reqDeleteCart, reqUpdateCheckedById } from "@/api"
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}
const actions = {
    // 获取购物车列表
    async getCartList({ commit }) {
        const result = await reqCartList()
        //打印数据
        // console.log(result)
        if (result.code === 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    // 删除购物车
    async deleteCartById({ commit }, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车中产品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除所有选中的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        //context小仓库：dispatch、getters、state,commit
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let Promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : '';
            //将结果放入数组
            PromiseAll.push(Promise)
        })
        // 只要有一个失败，就失败，必须全成功才成功
        return Promise.all(PromiseAll)
    },
    //全选按钮的回调
    updateAllCartIsChecked({ dispatch, getters }, isChecked) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let Promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            PromiseAll.push(Promise)
        })
        return Promise.all(PromiseAll)
    }
}
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}