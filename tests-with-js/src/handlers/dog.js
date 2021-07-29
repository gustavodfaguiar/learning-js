const { OK, BAD_REQUEST, UNAUTHORIZED } = require('http-status');
const dogCeoService = require('../services/dogCeo');

const parseValidJWT = (ctx) => {
    const { hash } = ctx.params;
    try {
      const { name } = jwt.decode(hash);
      return { name };
    } catch (e) {
        switch (e && e.message) {
            case 'invalid token':
                ctx.throw(BAD_REQUEST, e.message);
                break;
            case 'invalid signature':
                ctx.throw(BAD_REQUEST, e.message);
                break;
            case 'jwt expired':
                ctx.throw(BAD_REQUEST, e.message);
                break;
            default:
                ctx.throw(UNAUTHORIZED, 'Unauthorized');
        }
    }
};

const getDog = async (ctx) => {
    const { name } = parseValidJWT(ctx);
    const dog = await dogCeoService.getDog({ name });

    ctx.response.body = dog
    ctx.response.status = OK;
};

module.exports = {
    getDog
}
