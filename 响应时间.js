
const Koa = require('koa')
const app = new Koa();

app.use(async (ctx, next) => {   //记录服务器响应时间的中间件
    let startTime = new Date().getTime();
    console.log(startTime)

    await next();

    let endTime = new Date().getTime();
    console.log(endTime)
});


app.use(async (ctx, next) => {
    let m = 0;
    for(let i=0; i<10000000, i++;){
        m++
    }
    await next()
});

app.listen(3001, () => {
    console.log(app.listen(3000))
});