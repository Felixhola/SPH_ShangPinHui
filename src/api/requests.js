//对于axios进行二次封装
import axios from "axios";
//获取仓库:存储数据
import store from "@/store";
//引入进度条
import nprogress from 'nprogress';
//引入相关进度条的样式
import "nprogress/nprogress.css";

//axios.create方法执行,其实返回一个axios和request一样的
let requests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/api",
    //超时的设置
    timeout: 5000
});

//请求拦截器:将来项目中【N个请求】，只要发请求,会触发请求拦截器!!!
requests.interceptors.request.use(config => {
    //请求拦截器:请求头【header】,请求头能否给服务器携带参数
    if (store.state.detail.uuid_token) {
        //2:如果有token,将token携带到请求头中
        //userTempId是后台决定好的一个参数
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    //token获取，每次请求都会获取token
    if (store.state.user.token) {
        config.headers.token = store.state.user.token;
    }
    //请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数
    //进度条开始
    nprogress.start();
    return config;
});


//响应拦截器：请求数据返回会执行
requests.interceptors.response.use((res) => {
    //res:实质就是项目中发请求、服务器返回的数据
    //进度条结束
    nprogress.done();
    return res.data;
}, (err) => {
    //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
    // alert(err.message);
    //终止Promise链
    // return new Promise();
    return Promise.reject(new Error('faile'));
});

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
export default requests;




