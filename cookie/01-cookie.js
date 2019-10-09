
const http = require("http")
 http.createServer((req,res)=>{
    if(req.url === "/write"){
        //种植cookie
        // res.setHeader("Set-Cookie","name=wangcai; domain=.wangcai.cn");
        // res.setHeader("Set-Cookie","name=wangcai; path=/write");
        // res.setHeader("Set-Cookie","name=wangcai; max-age=10");
        res.setHeader("Set-Cookie","name=wangcai; ");
        res.end("write ok");
        return
    }
    if(req.url === "/read"){
        //读取cookie
        res.end(req.headers.cookie || "empty");
    }
 }).listen(3000);