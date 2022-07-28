//统一管理项目前部的接口
import requests from "./requests";
import mockRequests from "./mockRequests";
//封装函数:复用
//将来这个函数可以在别的地方使用,需要对外暴露【分别暴露】
//获取商品分类的数据
export const reqCategory = () => {
   //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
   //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
   //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
   return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}

export const reqGetBannerList = () => {
   return mockRequests({ method: 'get', url: '/banner' });
}

//获取floor的数据
export const reqGetFloorList = () => {
   return mockRequests({ method: 'get', url: '/floor' });
}

//Search搜索框的数据
export const reqGetSearchInfo = (params) => {
   return requests({ method: 'post', url: '/list', data: params });
}

//产品详情的数据
export const reqGoodsInfo = (skuid) => {
   return requests({ method: 'get', url: `/item/${skuid}/` });
}

//将产品添加到购物车中（或者更新某一个产品的数量）
export const reqAddOrUpdateShopCart = (skuid, skuNum) => {
   return requests({ method: 'post', url: `/cart/addToCart/${skuid}/${skuNum}` });
}
//获取购物车的数据
export const reqCartList = () => {
   return requests({ method: 'get', url: '/cart/cartList' });
}
//删除购物车中的某一个产品
export const reqDeleteCart = (skuId) => {
   return requests({ method: 'delete', url: `/cart/deleteCart/${skuId}` });
}
//更新购物车中产品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
   return requests({ method: 'get', url: `/cart/checkCart/${skuId}/${isChecked}` });
}
//获取验证码
export const reqGetCode = (phone) => {
   return requests({ method: 'get', url: `/user/passport/sendCode/${phone}` });
}
//用户注册
export const reqUserRegister = (data) => {
   return requests({ method: 'post', url: '/user/passport/register', data });
}
//用户登录
export const reqUserLogin = (data) => {
   return requests({ method: 'post', url: '/user/passport/login', data });
}
//获取用户信息【用户登录之后，获取用户信息，需要token】
export const reqUserInfo = () => {
   return requests({ method: 'get', url: '/user/passport/auth/getUserInfo' });
}
//退出登录
export const reqLogout = () => {
   return requests({ method: 'get', url: '/user/passport/logout' });
}
//获取用户地址列表
export const reqAddressInfo = () => {
   return requests({ method: 'get', url: '/user/userAddress/auth/findUserAddressList' });
}
//获取商品清单
export const reqOrderInfo = () => {
   return requests({ method: 'get', url: '/order/auth/trade' });
}
//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data });
//获取支付信息
export const reqPayInfo = (orderId) => {
   return requests({ method: 'get', url: `/payment/weixin/createNative/${orderId}` });
}
//获取订单支付状态
export const reqPayStatus = (orderId) => {
   return requests({ method: 'get', url: `/payment/weixin/queryPayStatus/${orderId}` });
}
//获取个人中心的数据
export const reqMyOrderList = (page,limit) => {
   return requests({ method: 'get', url: `/order/auth/${page}/${limit}` });//第几页，每页多少条
}