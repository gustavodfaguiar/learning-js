const jwt = require('jsonwebtoken');
const { BAD_REQUEST, UNAUTHORIZED } = require('http-status');

module.exports = async (ctx, next) => {
  await next();
  const { authorization } = ctx.header;

  try {
    jwt.verify(authorization, 'secret', { algorithm: "HS256" });
  } catch (e) {
    switch (e.message) {
      case 'invalid token':
        ctx.throw(BAD_REQUEST, {
          message: e.message
        });
        break;
      case 'invalid signature':
        ctx.throw(BAD_REQUEST, {
          message: e.message
        });
        break;
      case 'jwt expired':
        ctx.throw(BAD_REQUEST, {
          message: e.message
        });
        break;
      default:
        ctx.throw(UNAUTHORIZED, {
          message: 'Unauthorized'
        });
    }
  }
};
