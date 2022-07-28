//vuex模板
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    //验证码
    phoneCode: '',
    //token
    token: getToken(),
    //用户信息
    userInfo: {},
}
const mutations = {
    GETCODE(state, phoneCode) {
        state.phoneCode = phoneCode
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.token = ''
        state.userInfo = {}
        removeToken()
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        //打印
        // console.log(result)
        // return result.data
        if (result.code === 200) {
            commit('GETCODE', result.data)
        }
    },
    //用户注册
    async userRegister({ commit }, data) {
        let result = await reqUserRegister(data)
        //打印
        // console.log(result)
        if (result.code === 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户登录
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        //打印
        // console.log(result)
        if (result.code === 200) {
            commit('USERLOGIN', result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        //打印
        // console.log(result)
        if (result.code === 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    //用户退出
    async userLogout({ commit }) {
        let result = await reqLogout()
        //打印
        // console.log(result)
        if (result.code === 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
}
export default {
    //开启命名空间
    // namespaced: true,
    state,
    mutations,
    actions,
    getters
}