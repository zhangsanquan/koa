const Koa = require('koa');
const views = require('koa-views');
const { join } = require('path');
const koaBody = require('koa-body');
const mongoose = require('mongoose');
const md5 = require('./jiami');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

app.use(koaBody());
app.use(views(join(__dirname,"pug"),{extension:'pug'}));  //申明和指定pug

const db = mongoose.createConnection("mongodb://localhost:27017/user",{useNewUrlParser:true});
mongoose.Promise = global.Promise ;
db.on("error",console.log.bind(console,"数据库连接失败"));
db.on("open",()=>{
    console.log("数据库连接成功")
});
const Schema = mongoose.Schema;
const zsqSchema = new Schema({
                        name:String,
                        password:Number|String      //加密完变成了字符串。。。
                    });
const User = db.model("user",zsqSchema);


router.get('/',(ctx)=>{
    ctx.body="index";
});
//动态路由
router.get('/index/:id',async (ctx)=>{
    ctx.body = ctx.params.id
});

router.get('/user/zhuce',async (ctx)=>{
    await ctx.render("zhuce.pug");
});
router.post('/user/zhuce',async (ctx)=>{ //这里用post
   //console.log(ctx.request.body);  //注意要koa-body 不然显示undefined
   const userName =ctx.request.body.name;
   const passWord = ctx.request.body.password;

   //查询数据库是否存在账户
   await new Promise((resolve,reject)=>{
       User.find({name:userName}, (err,data)=>{
           if(err){
               return reject(err);
           }
           if(data.length){  //说明用户查询到了，用户已存在
               return resolve("用户名已存在")
           }
           //用户名不存在，存入数据库
           const userData = {
               name: userName,
               password: md5(passWord),
           };
           new User(userData).save((err,data)=>{
               if(err){
                   reject(err)
               }else{
                   resolve("注册成功")
               }
           });
       })
   }).then(async res=>{
       console.log(res);
       ctx.body = res;
     /*  if(res="注册成功"){
           window.location.href="xxx"
           await ctx.render()
       }*/
   }).catch(async err=>{
       console.log(err);
       ctx.body=err;
       await ctx.render('error.pug',{status:404})
   });



});

app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(8050,()=>{
        console.log('服务器启动成功')
    });