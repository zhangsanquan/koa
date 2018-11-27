const session = require('koa-session');
const Router = require('koa-router');
const Koa = require('koa');
const app = new Koa();

app.keys = ['session key'];

const CONFIG = {
    key:'koa:sess',
    maxAge:86400000,
    autoCommit:true,
    overwrite:true,
    httpOnly:true,
    signed:true,
    rolling:true,  //在过期时间内操作，则过期时间往后推迟
    renew:false,
};

app.use(session(CONFIG,app));

const router = new Router();

router.get('/',async ctx=>{
/*  if (ctx.path === '/favicon.ico') return;*/
    let n = ctx.session.views || 0;
    ctx.session.views +=1;
    ctx.body = `第${n}次浏览`
});

/*app.use(ctx=>{
    if (ctx.path === '/favicon.ico') return;
    let n = ctx.session.views || 0;
    ctx.session.views +=1;
    ctx.body = `第${n}次浏览`
});*/
app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3000);