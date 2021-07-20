const jwt = require('jsonwebtoken');
const { BAD_REQUEST, UNAUTHORIZED } = require('http-status');

module.exports = async (ctx, next) => {
  const { authorization } = ctx.header;

  try {
    jwt.verify(authorization, 'secret', { algorithm: "HS256" });
    await next();
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
