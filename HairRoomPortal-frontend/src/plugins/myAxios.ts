import axios from "axios";

const baseURLByProduction = 'https://1bdf3988.r3.cpolar.cn/api';
const baseURLByDevelopment = 'http://localhost:8081/api'
const myAxios = axios.create({
    baseURL: baseURLByDevelopment
})
myAxios.defaults.withCredentials = true;
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("即将发送请求,config=",config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 通用拦截未登录用户，重定向到登录页
    if (response.data?.code === 40100) {
        const currentPath = window.location.pathname;
        const redirectUrl = window.location.href;
        if(!currentPath.includes('/UserPage/UserLoginPage')){
            window.location.href = `/UserPage/UserLoginPage?redirect=${redirectUrl}`;
        }

    }
    console.log("即将响应,response=",response)
    // 只关心响应数据中的data，这样我们在得到响应后只需要关心后端的封装
    return response.data;
}, function (error) {
    return Promise.reject(error);
});

export default myAxios;