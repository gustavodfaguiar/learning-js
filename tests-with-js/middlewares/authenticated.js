const jwt = require('jsonwebtoken');
const { BAD_REQUEST, UNAUTHORIZED } = require('http-status');

module.exports = async (ctx, next) => {
  const { authorization } = ctx.header;

  try {
    jwt.verify(authorization, 'secret', { algorithm: "HS256" });
    await next();
  } catch (err) {
    switch (err && err.message) {
      case 'invalid token' || 'invalid signature' || 'jwt expired':
        ctx.status = err.statusCode || err.status || BAD_REQUEST;
        ctx.body = {
          message: err.message
        };
        break;
      // case 'invalid signature':
      //   ctx.status = err.statusCode || err.status || BAD_REQUEST;
      //   ctx.body = {
      //     message: err.message
      //   };
      //   break;
      // case 'jwt expired':
      //   ctx.status = err.statusCode || err.status || BAD_REQUEST;
      //   ctx.body = {
      //     message: err.message
      //   };
      //   break;
      default:
        ctx.status = err.statusCode || err.status || UNAUTHORIZED;
        ctx.body = {
          message: "Unauthorized"
        };
    }
  }
};
