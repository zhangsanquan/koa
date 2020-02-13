const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./routerModule');

const app = new Koa();

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8089, () => {
    console.log('正在监听8089')
})