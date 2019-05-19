const Koa = require('koa');
const koaBody = require('koa-body');
const mongoose =  require('mongoose');
const views = require('koa-views');
const {join} = require('path');
const cors = require('koa2-cors');
const session = require('koa-session');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(cors());  //跨域
app.use(views(join(__dirname,"pug"),{extension:'pug'}));

//session
app.keys = ['session key'];
const CONFIG = {
    key:'koa:sess',
    maxAge:86400000,  //过期时间
    autoCommit:true,
    overwrite:true,
    httpOnly:false,
    signed:true,
    rolling:true,  //在过期时间内操作，则过期时间往后推迟
    renew:false,
};
app.use(session(CONFIG,app));

//操作数据库
const db = mongoose.createConnection("mongodb://localhost:27017/user",{useNewUrlParser:true});
mongoose.Promise = global.Promise ;
db.on("error",console.log.bind(console,"数据库连接失败"));
db.on("open",()=>{
    console.log("数据库连接成功")
});
const Schema = mongoose.Schema;
const zsqSchema = new Schema({
    name:String,
    password:Number|String
});
const User = db.model("user",zsqSchema);


router.get('/',async ctx=>{
    await ctx.render('index.pug')
});
router.get('/user/login',async ctx=>{ //渲染页面 get
    await ctx.render("login.pug")
});
router.post('/user/login',async ctx=>{  //获取数据 post
   const user = ctx.request.body;
   const userName = user.name;
   const pwd = user.password;
   await new Promise((resolve,reject)=>{
       User.find({name:userName},(err,data)=>{
           if(err){
               return reject(err)
           }
           if(data.length===0){
               return reject('用户名不存在')
               //可以跳转到注册页面 ctx.body=xx
           }
           //存在用户则比较密码
           //console.log(data)
            if( data[0].password == pwd ){  //密码正确  有时候要加密后对比 MD5(pwd)
                //ctx.body = "登陆成功";
                return resolve(data)
            }else{
               //ctx.body = "密码错误";
               return resolve('');
            }
       })

   }).then(async res=>{
           console.log(res);
           if(res){
               //设置cookie
               ctx.cookies.set("username",userName,{ //(name,value,options)
                    path:'/',  //所有页面都携带这个cookie信息
                    httpOnly:true, //false 控制台document.cookie就得不到这个cookie,但是Application还是可以看到
                    maxAge:1000*60*60,  //1小时过期
                    //secure:true, //默认false,true则 https也可访问
               });
               ctx.cookies.set("_id",res[0]._id,{
                    httpOnly:true,
                    maxAge:36e5
               });

               ctx.session={  //设置session
                   username:userName,
                   _id:res[0]._id,
               };

               await ctx.render('index.pug');
           }else{
               ctx.body = "密码错误"
           }
       })
       .catch(async err=>{
           console.log(err);
           await ctx.render("error.pug")
       })

});

app.use(router.routes())
    .use(router.allowedMethods())
    .listen(8050,() => {
        console.log('服务器启动成功')
    });