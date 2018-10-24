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
    });
    it('should post with valid user', async() => {
        await request(server)
            .post('/api.v1.0/users')
            .send({
                name: "Mack",
                email: "francis1234@gmail.com",
                password: "1234abcdABCD"
            })
            .expect(201);
    });
    it('should not post with invalid user name', async() => {
        await request(server)
            .post('/api.v1.0/users')
            .send({
                name: "M",
                email: "francis1234@gmail.com",
                password: "1234abcdABCD"
            })
            .expect(400);
    });
    it('should not post with invalid email', async() => {
        await request(server)
            .post('/api.v1.0/users')
            .send({
                name: "Mack",
                email: "francis1234@com",
                password: "1234abcdABCD"
            })
            .expect(400);
    });
    it('should not post with invalid passwords', async() => {
        await request(server)
            .post('/api.v1.0/users')
            .send({
                name: "Mack",
                email: "francis1234@gmail.com",
                password: "1234abcd"
            })
            .expect(400);

        await request(server)
            .post('/api.v1.0/users')
            .send({
                name: "Mack",
                email: "francis1234@gmail.com",
                password: "1234ABCD"
            })
            .expect(400);

        await request(server)
            .post('/api.v1.0/users')
            .send({
                name: "Mack",
                email: "francis1234@gmail.com",
                password: "123Abc!"
            })
            .expect(400);
    });
});

