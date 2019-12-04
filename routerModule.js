const Router = require('koa-router');
const routerMethod =require('./routerMethod');
const router = new Router();

router.get('/',routerMethod.home)
      .get('/login',routerMethod.login)

      .post('/user/:id', async (ctx, next) => {  //单路由多中间件情况
        ctx.user = await User.find(ctx.params.id);

        next() //把控制权交给下一个中间件
      },
     (ctx, next) => {  //上面那个中间件用来获取数据库数据， 第二个中间件用来处理获取到数据， 可读性和可维护性可能更好点
        const user = ctx.user.forEach(item => {
            item.num++
        });

        ctx.body = {
            data: user
        }
     })


module.exports= router ;