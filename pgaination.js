//分页
const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const app = new Koa();
const router = new Router();


const db = mongoose.createConnection("mongodb://localhost:27017/fenye",{useNewUrlParser:true}); //fenye库不存在则创建

mongoose.Promise = global.Promise ;
db.on("error",console.log.bind(console,"数据库连接失败"));
db.on("open",()=>{
    console.log("数据库连接成功")
});

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const pageSchema = new Schema(
    {
    title:String,
    author:{ //与users表关联
        type:ObjectId,
        ref:'users'
    },
    content:String,
    },
    {
        versionKey:false, //把默认的一项隐藏了
        timestamp:{  //加入数据库的时间
            createAt:'created'
        }
    }
);

const Article = db.model("article",pageSchema);

const mydata = {
    title:'这是文章标题',
    author:'zsq',
    content:'这是内容'
};
new Article(mydata).save();


router.get('/news/:page',async ctx=>{
    //获取前端请求页面第几页
    let page = ctx.params.page || 1; //默认第一页
    //查询新闻文章数据库Article
  let article_data = await Article.find()
            .sort('-created')  //created  按创建时间排序 （也可以按其他字段排序） - 代表降序 排序
            .skip(5*(page-1))  //每页5条，如第二页就跳过5*（2-1）条数据，所以第二页从5-9
            .limit(5)          //每页限制5条
            .populate({
                path:"author" ,  // 跟上面的schema码的关联属性一致
                select:'title content'   //筛选出需要输出的值
            })
            .then(data=>{

            })
            .catch(err=>{
                console.log(err)
            })

    //await ctx.body=article_data
    await ctx.render('news.pug',{
        article:article_data   //去news页面遍历渲染就完事了
    })
});



app
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(8050,()=>{
        console.log('服务器启动成功')
    });