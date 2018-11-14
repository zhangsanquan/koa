const Koa = require('koa');
const router = require('./routerModule');

const app = new Koa();

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8050)