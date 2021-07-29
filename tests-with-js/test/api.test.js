const KoaContext = require('koa/lib/context');
const { UNAUTHORIZED } = require('http-status');
const jwt = require('jwt-simple');
const dogHandler = require('../src/handlers/dog');

jest.mock('../src/services/dogCeo');

process.env.FLIGHT_OPTIONS_SECRET_TOKEN = 'my-secret';

const fakeReasons = [
  {
    value: 'foo_bar_baz',
    comment: 'Some random comment about the reason'
  }
];

const fakeJWTPayload = {
  name: 'akita'
};
const fakeJWT = jwt.encode(fakeJWTPayload, 'secret', 'HS256');
const fakeExpiredJWT = jwt.encode(
  {
    ...fakeJWTPayload,
    exp: 1000 // expired
  },
  'secret',
  'HS256'
);


describe('Testing handler/dog.js', () => {
    const buildFakeContext = ({ hash = fakeJWT, request = {}, response = {} } = {}) => {
        const ctx = Object.create(KoaContext);
        ctx.params = { hash };
        ctx.response = response;
        ctx.request = request;
        return ctx;
    };

  describe('getDog()', () => {
        it('must return status code 410 when hash is an expired JWT', async () => {
            const ctx = buildFakeContext({ hash: fakeExpiredJWT });

            let error;
            try {
                await dogHandler.getDog(ctx);
            } catch (err) {
                error = err;
            }

            expect(error.status).toBe(UNAUTHORIZED);
            expect(error.message).toBe('Unauthorized');
        });

        it('must return status code 400 when hash is an invalid JWT', async () => {
            const ctx = buildFakeContext({ hash: 'some invalid jwt' });

            let error;
            try {
                await dogHandler.getDog(ctx);
            } catch (err) {
                error = err;
            }

            expect(error.status).toBe(BAD_REQUEST);
            expect(error.message).toBe('xx');
        });
    });
});
