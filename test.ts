const request = require('supertest');
import { expect } from 'chai';
import { app } from './index';

const server = app.listen(3000);

describe('App', () => {
    after(() => {
        server.close();
    });

    it('should run', async() => {
        expect(true).to.be.true;
    });

    it('should get', async() => {
        await request(server)
            .get('/')
            .expect(200)
            .expect(/hi/);
    })
});

