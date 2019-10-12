//封装自己的axios
import axios from "axios"
import store from "../store"
import { getLocal } from "../libs/local"
class AjaxRequest {
    constructor() {
        //请求的基础路径
        this.baseURL = process.env.NODE_ENV == "production" ? "/" : "http://localhost:3030"
        //请求的超时时间
        this.timeout = 3000;
        this.queue = {};
    }
    merge(options) {
        return { ...options, baseURL: this.baseURL, timeout: this.timeout }
    }
    //封装一个拦截方法
    setInterceptor(instance,url) {
        // 每次请求时，都要加上一个loading效果
        instance.interceptors.request.use((config)=>{
            config.headers.Authorization = getLocal("token");
            // console.log(this.queue)  // {}
            // console.log(Object.keys(this.queue))  // []
            // 第1次请求时，显示Loading动画
            if(Object.keys(this.queue).length === 0){
                store.commit('showLoading');
            }
            this.queue[url] = url; 
            return config;
        });
        //响应拦截
        instance.interceptors.response.use((res)=>{
            delete this.queue[url]
            if(Object.keys(this.queue).length === 0){
                store.commit('hideLoading')
            }
            // store.commit('hideLoading')
            return res.data;
        });
    }
    request(options) {
        //创建一个axios实例
        let instance = axios.create(); 
        this.setInterceptor(instance,options.url);
        let config = this.merge(options);
        //axios执行后返回promise
        return instance(config);
    }
}
export default new AjaxRequest;