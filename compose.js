const Koa = require('koa');
const app = new Koa();
const compose = require('koa-compose');    //把所有中间件集成单个，便于重用或导出


async function middleware1(ctx, next) {
    console.log(1);
    await next();
    console.log('1结束')
}


async function middleware2(ctx, next) {
    console.log(2);
    await next();
    console.log('2结束')
}

async function middleware3(ctx, next) {
    console.log(3);
    await next();
    console.log('3结束')
}

const all = compose([middleware1, middleware2, middleware3]);


module.exports = all

