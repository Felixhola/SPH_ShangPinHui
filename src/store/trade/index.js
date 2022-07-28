import { reqAddressInfo ,reqOrderInfo} from "@/api"
const state = {
    //用户地址列表
    addressInfo: [],
    //商品清单
    orderInfo: {},
}
const mutations = {
    GETUSERADDRESS(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}
const actions = {
    //获取用户地址
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        // console.log(result)
        if(result.code === 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    //获取商品清单
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        // console.log(result)
        if(result.code === 200) {
            commit('GETORDERINFO', result.data)
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}