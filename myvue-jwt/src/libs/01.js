//封装自己的axios
import axios from "axios"
class AjaxRequest {
    constructor() {
        //请求的基础路径
        this.baseURL = process.env.NODE_ENV == "production" ? "/" : "http://localhost:3030"
        //请求的超时时间
        this.timeout = 3000;
    }
    merge(options) {
        return { ...options, baseURL: this.baseURL, timeout: this.timeout }
    }
    request(options) {
        //创建一个axios实例
        let instance = axios.create();
        let config = this.merge(options);
        //axios执行后返回promise
        return instance(config);
    }
}



export default new AjaxRequest