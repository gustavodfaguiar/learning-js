const nock = require('nock')
const request = require('supertest');
const server = require('./app');

const { OK, NO_CONTENT, NOT_FOUND, UNAUTHORIZED } = require('http-status');

afterAll(() => {
    server.close();
});

describe('User', () => {

    test('Given request to user not params should return 404', async () => {
        let error = null;
        let response = null;
        try {
           response = await request(server)
                                .get('/user/');
        } catch (err) {
            error = err;
        }

        expect(response.status).toEqual(NOT_FOUND);
    });

    test('Given request to not existing user should return 204', async () => {
        let error = null;
        let response = null;
        try {
           response = await request(server)
                        .get('/user/123')
                        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2MjY3MDQ2Mjh9.EicDDeKpdqsC9ARz7h9fBpFbuzTnz84JQib4QFkf_ZE');
        } catch (err) {
            error = err;
        }
        expect(response.status).toEqual(NO_CONTENT);
    });

    test('Given request to existing user should return 200', async () => {
        let error = null;
        let response = null;
        try {
            response = await request(server)
            .get('/user/1')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2MjY3MDQ2Mjh9.EicDDeKpdqsC9ARz7h9fBpFbuzTnz84JQib4QFkf_ZE');
        } catch (err) {
            error = err;
        }

        expect(response.status).toEqual(OK);
    });
});
