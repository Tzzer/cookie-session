let express = require("express")
let bodyParser = require("body-parser")

let app = express()

// 配置跨域
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,PUT"),
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization")
    if(req.method.toLowerCase() === "options"){
        return res.end();
    }
    next();
})

// 配置bodyparser
app.use(bodyParser.json())

app.get("/user",(req,res)=>{
    setTimeout(()=>{
        res.json({name:"wangcai"})
    },500)
})

app.listen(3030)