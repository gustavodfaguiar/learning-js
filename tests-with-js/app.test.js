const nock = require('nock')
const request = require('supertest');
const server = require('./app');

const { OK, NO_CONTENT, NOT_FOUND } = require('http-status');

afterAll(() => {
    server.close();
});

describe('User', () => {

    test('Given request to user not params should return 404', async () => {
        nock('http://localhost:3000')
            .get('/user/')
            .reply(404);

        let error = null;
        let response = null;
        try {
           response = await request(server).get('/user/');
        } catch (e) {
            error = e
        }

        expect(response.status).toEqual(NOT_FOUND);
    });

    test('Given request to not existing user should return 204', async () => {
        nock('http://localhost:3000')
            .get('/user/123')
            .reply(204);

        let error = null;
        let response = null;
        try {
           response = await request(server).get('/user/123');
        } catch (e) {
            error = e
        }

        expect(response.status).toEqual(NO_CONTENT);
    });

    test('Given request to existing user should return 200', async () => {
        nock('http://localhost:3000')
            .get('/user/1')
            .reply(201, {"first_name": "Gustavo", "id": 1, "last_name": "Aguiar"});

        let error = null;
        let response = null;
        try {
           response = await request(server).get('/user/1');
        } catch (e) {
            error = e
        }

        expect(response.status).toEqual(OK);
    });
});
