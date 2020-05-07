const Koa = require('koa');
const Router = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const myGraphQLSchema = require('./schema')

const app = new Koa();
const router = new Router();

router.all('/graphql', graphqlHTTP({
    schema: myGraphQLSchema,
    graphiql: true
}));

app.use(router.routes())
    .use(router.allowedMethods())
    .listen(8050);
