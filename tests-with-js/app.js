const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const jwt = require('jsonwebtoken');

const { INTERNAL_SERVER_ERROR } = require('http-status');

const app = new Koa();
const router = new Router();

const isAuthenticated = require('./middlwares/authenticated');
const userService = require('./services/user');

router.get('/user/:id', isAuthenticated, async (ctx) => {
    let user = null;

    try {
        user = userService.get(ctx.params.id);
    } catch (e) {
        ctx.throw(INTERNAL_SERVER_ERROR, {
            message: "Server Error"
        });
    }

    ctx.body = user;
    return ctx;
});

router.get('/jwt', (ctx) => {
    let token = jwt.sign({ 'user': 'admin' }, 'secret', { algorithm: 'HS256', expiresIn: "10ms" });
    ctx.body = token;
})

app
  .use(logger())
  .use(router.routes())
  .use(router.allowedMethods());

const server = app.listen(3000);

module.exports = server;
