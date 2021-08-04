const { GONE, BAD_REQUEST, UNAUTHORIZED } = require('http-status');
const dogCeoService = require('../services/dogCeo');

const validJWT = (ctx) => {
    const { hash } = ctx.params;
    try {
      const { name } = jwt.decode(hash);
      return { name };
    } catch (e) {
        switch (e.message) {
            case 'Token expired':
                ctx.throw(GONE, e.message);
                break;
            case 'Signature verification failed':
                ctx.throw(BAD_REQUEST, e.message);
                break;
            default:
                ctx.throw(UNAUTHORIZED, 'Unauthorized');
        }
    }
};

const getDog = async (ctx) => {
    const { name } = validJWT(ctx);
    const dog = await dogCeoService.getDog({ name });

    ctx.response.body = dog
    ctx.response.status = OK;
};

module.exports = {
    getDog
}
