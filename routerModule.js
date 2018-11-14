const Router = require('koa-router');
const routerMethod =require('./routerMethod');
const router = new Router();

router.get('/',routerMethod.home);

router.get('/login',routerMethod.login);

module.exports= router ;