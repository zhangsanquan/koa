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

app.listen(8050)