const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
app.use(koaBody());

const { getAllCustomers, getCustomerById, getCustomerByName, updateCustomer,
    createCustomer, deleteCustomer } = require('./Function');

router.get('/customer', async ctx => {  //进入客户首页时获取全部数据
    const res = await getAllCustomers();
    // ctx.type = jsonMIME; 好像说是为了通过JSON输出，同时为网站添加MIME映射，  但是感觉没必要吧
    ctx.body = {
        status: 0,
        data: res
    }
})

router.get('/customer/:id', async ctx => { //查询id
    const res = await getCustomerById(ctx.params.id);

    ctx.body = {
        status: 0,
        data: res
    }
})

router.get('/customer/name/:name', async ctx => { //查询名称
    const res = await  getCustomerByName(ctx.params.name);

    ctx.body = {
        status: 0,
        data: res
    }
})

router.post('/customer', async ctx => { //创建数据
    const params = ctx.request.body;
    await createCustomer();

    ctx.body = {
        status: 0
    }
})

router.post('/customer/:id', async ctx => { // 更新修改数据
    const params = ctx.request.body;
    await updateCustomer(ctx.params.id, params);

    ctx.body = {
        status: 0
    }
})

router.delete('/customer/:id', async ctx => {
    await deleteCustomer(ctx.params.id);

    ctx.body = {
        status: 0
    }
})

app.use( async (ctx,next) => { //前面接口没处理异常， 这里统一处理， 之前每个接口都返回异常情况好笨啊。。。
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