const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');

const app = new Koa();
const router = new Router({
    prefix: '/api'
});

app.use(koaBody());

const { getAllStudents, updateStudent, removeStudent, createStudent, getStudentById, getStudentByName } = require('./function');

router.get('/student', getAllStudents); //获取全部学生

router.get('/student/:id', ctx => {  //查学号
    getStudentById(ctx.params.id)
});

router.get('/student/:name', async ctx => { //查询学生名字
    getStudentByName(ctx.params.name)
});

router.post('/student', async ctx => { //新增学生数据
    createStudent(ctx.request.body)
});

router.post('/student/:id', async ctx => { // 更新
    updateStudent(ctx.params.id, ctx.request.body)
});

router.delete('/student/:id', async ctx => {
    removeStudent(ctx.params.id)
});



app.use( async (ctx,next) => { //前面接口没处理异常， 这里统一处理
    try {
        await next();
    } catch(err) {
        ctx.body ={
            status: -1,
            message: err.message
        }
    }
})




app.use(router.routes())
    .use(router.allowedMethods())
    .listen(8050,() => {
        console.log('服务器启动成功')
    });