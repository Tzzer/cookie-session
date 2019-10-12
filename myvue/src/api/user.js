//用户相关的接口
import axios from "../libs/ajaxRequest"

export const getUser = ()=>{
    return axios.request({
        url:'/user',
        method:'get'
    })
}