import userRouter from './users';
import { app } from './../../index';
import { expect } from 'chai';

const request = require('supertest');

let server;

describe('Users', () => {
    before(() => {
        server = app.listen(3000)
        app.use(userRouter.routes());
    })
    after(() => {
        server.close();
    });

    it('should run', async() => {
        expect(true).to.be.true;
    });

    it('should get', async() => {
        await request(server)
            .get('/api.v1.0/users')
            .expect(200);
    })
});

