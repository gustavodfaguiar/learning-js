const Koa = require('koa');
const KoaLogger = require('koa-logger');

const routes = require('./routes');

const app = new Koa();

if (app.env !== 'production') {
    app.use(new KoaLogger());
}

app
    .use(routes.routes())
    .use(routes.allowedMethods())

module.exports = app;
