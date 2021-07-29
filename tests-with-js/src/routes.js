const Router = require('koa-router');
const dogHandler = require('./handlers/dog');
const jwt = require('./lib/jwt');

const router = new Router();

router.get('/v1/dog/:hash', dogHandler.getDog);

router.get('/jwt-encode/:name', (ctx) => {
    const { name } = ctx.params;
    let payload = { name };

    ctx.body = { token: jwt.encode(payload, 'secret') };
});

router.get('/jwt-decode/:hash', (ctx) => {
    const { hash } = ctx.params;
    ctx.body = jwt.decode(hash, 'secret', 'HS256');
});

module.exports = router;
