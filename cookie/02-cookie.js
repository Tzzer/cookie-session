const http = require("http");
const querystring = require("querystring");
const sign = (value)=>{
    // 2EOpppDeVBaOirKx+n11hIzcQHgsirE7fYO7W6qmXOs=
    return require("crypto").createHmac("sha256","abc").update(value).digest("base64").replace(/\+/g,"")
}
http.createServer((req,res)=>{
    let arr = [];
    res.setCookie = function(key,value,options={}){
        let opts = [];
        if(options.domain){
            opts.push(`domain=${options.domain}`)
        }
        if(options.maxAge){
            opts.push(`max-age=${options.maxAge}`)
        }
        if(options.httpOnly){
            opts.push(`httpOnly=${options.httpOnly}`)
        }
        if(options.signed){
            // value = value+"."+"xxxxxx"
            // value+"."+sign(value)
            // console.log(sign(value)) // 加盐算法
            // value = value+"."+sign(value)
            // console.log(value) // 1.gpHnS6og+oGBB9agylSs5UOjYhAPjm/XLzWLdKp3YTU=
            // console.log(value)
            // console.log(value+'.'+sign(value))

            // console.log(value)
            value = value+'.'+sign(value)
            // console.log(value)
        }
        arr.push(`${key}=${value}; ${opts.join("; ")}`)
        res.setHeader('Set-Cookie', arr);
    }
    req.getCookie = function(key,options = {}){
        let obj = querystring.parse(req.headers.cookie,"; ");
        if(options.signed){
            // console.log(obj[key])  // 1.fPaWRj fFv1435oGW07zE2SITf5W6QezhjZ8alhp vU=
            if(obj[key]){
                // console.log(obj[key]) 
                let [value,s] = obj[key].split('.')
                console.log(value)
                let newSign = sign(value);
                // console.log(s,newSign)
                if(s === newSign){
                    return value
                }else{
                    return undefined;
                }
            }
            // console.log(obj[key].split('.'))
            // let res = obj[key].split('.')
            // console.log(res)
        }
        return obj[key];
    }
    if(req.url === "/write"){
        res.end("write ok ~")
        return
    }
    if(req.url === "/read"){
        res.end(req.getCookie("age") || 'empty');
    }
    if(req.url === "/visit"){
        res.setHeader("Content-type","text/plain; charset=utf8")
        let visit = req.getCookie("visit",{signed:true});
        // console.log(visit+"....")
        if(visit){
            visit = visit-0+1;
            // visit = Number(visit)+1;
            
            res.setCookie("visit",visit+'',{httpOnly:true,signed:true})
        }else{
            visit = 1;
            res.setCookie("visit","1",{httpOnly:true,signed:true})
        }
        res.end(`当前第${visit}次访问`)
    }
}).listen(3000);