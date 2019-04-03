const Koa = require('koa');
const koaBody = require('koa-body');
const views = require('koa-views');
const {join} = require('path');
const cors = require('koa2-cors');
const Router = require('koa-router');
const {sign} = require('jsonwebtoken');
const jwt = require('koa-jwt');
const admin = require('./admin');

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());  //跨域
app.use(views(join(__dirname,"pug"),{extension:'pug'}));

router.post('/api/login', async (ctx,next)=>{
    const user = ctx.request.body;  //获取用户信息
    const secret = 'zsq'; //设置秘钥
    const {username} = user;
    const UserInfer = await User.find(username); //判断用户是否存在
    if(UserInfer.length) { //存在时设置token
        const token = sign({username}, secret, {expiresIn: '1h'});
        ctx.body = {
            msg: '成功设置token',
            code:  1,
            token
        }
    } else {
        ctx.body = {
            code: -1,
            msg: '用户不存在，登录失败'
        }
    }
})

.get('/api/userInfer', jwt, async (ctx,next)=>{ //获取用户信息( 即登录成功后的页面 ) 需要jwt校验，
    ctx.body  = {
        username: ctx.state.user.username  // 把user.username存到ctx.state对象里，以便能够被另一个中间件读取(感觉就是类似vuex 的 state)
    }
})

.get('/api/admin', jwt, admin, async ctx=>{  //管理员接口 检查是否为管理员,这里的admin是个中间件， 先通过jwt中间件，再判断admin
    ctx.body  = {
        username: ctx.state.user.username
    }
})


