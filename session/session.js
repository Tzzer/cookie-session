const http = require("http");
const querystring = require("querystring");
let uuid = require("uuid")
let cardName = "tian"
//先把session存储到内存中
let session = {};
http.createServer((req, res) => {
    let arr = [];
    res.setCookie = function (key, value, options = {}) {
        let opts = [];
        if (options.domain) {
            opts.push(`domain=${options.domain}`)
        }
        if (options.maxAge) {
            opts.push(`max-age=${options.maxAge}`)
        }
        if (options.httpOnly) {
            opts.push(`httpOnly=${options.httpOnly}`)
        }
        if (options.signed) {
            // value = value+"."+"xxxxxx"
            // value+"."+sign(value)
            // console.log(sign(value)) // 加盐算法
            // value = value+"."+sign(value)
            // console.log(value) // 1.gpHnS6og+oGBB9agylSs5UOjYhAPjm/XLzWLdKp3YTU=
            // console.log(value)
            // console.log(value+'.'+sign(value))

            // console.log(value)
            value = value + '.' + sign(value)
            // console.log(value)
        }
        arr.push(`${key}=${value}; ${opts.join("; ")}`)
        res.setHeader('Set-Cookie', arr);
    }
    req.getCookie = function (key, options = {}) {
        let obj = querystring.parse(req.headers.cookie, "; ");
        if (options.signed) {
            // console.log(obj[key])  // 1.fPaWRj fFv1435oGW07zE2SITf5W6QezhjZ8alhp vU=
            if (obj[key]) {
                // console.log(obj[key]) 
                let [value, s] = obj[key].split('.')
                console.log(value)
                let newSign = sign(value);
                // console.log(s,newSign)
                if (s === newSign) {
                    return value
                } else {
                    return undefined;
                }
            }
            // console.log(obj[key].split('.'))
            // let res = obj[key].split('.')
            // console.log(res)
        }
        return obj[key];
    }
    if (req.url === "/eat") {
        let id = req.getCookie(cardName)
        if (id) {//有卡
            session[id].mny -= 100;
            res.end("current money is $"+session[id].mny)
        } else {
            let cartId = uuid.v4()
            //    console.log(cartId)
            session[cartId] = {mny:500}
            res.setCookie(cardName, cartId)
            res.end("current money is $500")
        }
        res.end("eat...")
    }
}).listen(3000);