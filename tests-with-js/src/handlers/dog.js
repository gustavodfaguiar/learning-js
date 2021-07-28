const httpStatus = require('http-status');
const dogCeoService = require('../services/dogCeo');

// const parseValidJWT = (ctx) => {
//     const { hash } = ctx.params;
//     try {
//       const { name } = jwt.decode(hash);
//       return { name };
//     } catch (e) {
//       switch (e.message) {
//         case JWT_TOKEN_EXPIRED_MESSAGE:
//           ctx.throw(httpStatus.GONE, {
//             code: Code.CONCIERGE.JWT_TOKEN_EXPIRED,
//             message: Message.CONCIERGE.JWT_TOKEN_EXPIRED()
//           });
//           break;
//         case JWT_SIGNATURE_INVALID_MESSAGE:
//           ctx.throw(httpStatus.BAD_REQUEST, {
//             code: Code.CONCIERGE.JWT_SIGNATURE_ERROR,
//             message: Message.CONCIERGE.JWT_SIGNATURE_ERROR()
//           });
//           break;
//         default:
//           ctx.throw(httpStatus.BAD_REQUEST, {
//             code: Code.CONCIERGE.JWT_GENERIC_ERROR,
//             message: Message.CONCIERGE.JWT_GENERIC_ERROR()
//           });
//       }
//       return false;
//     }
// };

const getDog = async (ctx) => {
    // const { name } = parseValidJWT(ctx);
    const { name } = ctx.params;
    const dog = await dogCeoService.getDog({ name });

    ctx.response.body = dog.body
    ctx.response.status = httpStatus.OK;
};

module.exports = {
    getDog
}
