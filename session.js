const session = require('koa-session');
const Koa = require('koa');
const app = new Koa();

app.keys = ['session key'];

const CONFIG = {
    key:'koa:sess',
    maxAge:86400000,
    autoCommiy:true,
    overwrite:true,
    httpOnly:true,
    signed:true,
    rolling:false,
    renew:false,
};

app.use(session(CONFIG,app));

app.use(ctx=>{
    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.views || 0;
    ctx.session.views +=1;
    ctx.body = `第${n}次浏览`
});

app.listen(3000);