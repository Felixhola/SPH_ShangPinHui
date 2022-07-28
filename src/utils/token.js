//设置token
export const setToken = (token) => {
    localStorage.setItem('TOKEN', token)
}
//获取token
export const getToken = () => {
    return localStorage.getItem('TOKEN')
}
//删除token
export const removeToken = () => {
    localStorage.removeItem('TOKEN')
}