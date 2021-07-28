const Router = require('koa-router');
const dogHandler = require('./handlers/dog');

const router = new Router();

router.get('/v1/dog/:name', dogHandler.getDog);

module.exports = router;
