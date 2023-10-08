//utils文件夹下request.js中配置
 
//导入 axios
import axios from "axios";
 
//实例化axios
var service  = axios.create({
    timeout: 10*1000, //超时时间
    baseURL:''   //基准路径,可以省略重复前缀
})
 
//设置请求拦截器
// service.interceptors.request.use(
//     (config)=>{
//         //添加请求头参数
//         config.headers['token'] = '';
//         return config;
//     },
//     (error)=>{
//         return Promise.reject(error)
//     }
// )
//设置响应拦截器
service.interceptors.response.use(
    (res)=>{
        return res;
    },
    (error)=>{
        if( error.response.status === 401 ){
            console.log('登陆过期,重新登录!');
        }else if( error.response.status === 404 ){
            console.log('访问路径有误!');
        }else if( error.response.status === 500 ){
            console.log('服务器内部错误!');
        }else if( error.response.status === 503 ){
            console.log('服务器不可用!');
        }else if( error.response.status === 504 ){
            console.log('服务器转发失败!');
        }
        return Promise.reject(error)
    }
)
 
export default service;