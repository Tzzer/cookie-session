//用户相关的接口
import axios from "../libs/ajaxRequest"

//向外暴露一个getUser方法，方法中调用接口
export const getUser = ()=>{
    return axios.request({
        url:'/user',
        method:'get'
    })
}

//再向外暴露一个登录的方法 方法内部也是调接口
export const login = (username)=>{
    return axios.request({
        url:'login',
        method:'post',
        data:{
            username
        }
    })
}
export const validate = ()=>{
    return axios.request({
        url:"/validate",
        method:'get',
    })
}
