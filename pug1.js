const Koa = require('koa');
const views = require('koa-views');
const { join } = require('path');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


app.use(views(join(__dirname,"pug"),{extension:'pug'}));

router.get('/',async(ctx)=>{
    await ctx.render("index.pug");
});
router.get('/login',async(ctx)=>{
    await ctx.render("login.pug")
});
router.get('/data',async(ctx)=>{
    //数据库渲染返回的数据arr
    await ctx.render("data.pug",{
        dataArr:["数据库数据1","数据库数据2","数据库数据3"]
    })
})

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(8050)