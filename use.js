const Koa = require('koa');
const app = new Koa();

app.use(async (ctx,next)=>{
    console.log('接收中间件1请求');
    next();
    ctx.body='hello world';
    console.log('响应中间件1请求');
});

app.use(async (ctx,next)=>{
    console.log('接收中间件2请求');
    next();
    ctx.body='中间件2响应成功';
    console.log('响应中间件2事件')
});

//1344321 从外到里再从里到外(洋葱模型)

//利用中间件获取响应时间
app.use(async (ctx,next)=>{
    let startTime = new Date().getTime();
    await next();
    let endTime = new Date().getTime();
    console.log(`响应时间：${endTime-startTime}毫秒`)
});
app.use(async (ctx,next)=>{
    //需要测试的事件执行时间写这里(如：测试这个for循环花了多久时间)
    for(let i=0; i<10000; i++){
       console.log(i)
    }
    await next()
});
app.listen(8050)