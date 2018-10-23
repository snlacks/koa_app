import { validate } from 'class-validator';
import { User, setPassword } from './../../schemas/user';
import * as Router from 'koa-router';

import koaBody = require('koa-body');
const router = new Router();
const users = [
    {
        name: 'steven',
        email: 'snlacks@gmail.com'
    },
    {
        name: 'dave',
        email: 'dave@gmail.com'
    },
    {
        name: 'bill',
        email: 'bill@gmail.com'
    },
]

// router.use(koaBody());
router.get('/', ctx => {
    try {
        ctx.body = users;
    } catch (e) {

    }
});

router.post('/', async ctx => {
    let errors 
    try {
        const user: User = new User(ctx.request.body);
        await setPassword(ctx.request.body.password, user);
        errors = await validate(user);

        if(errors.length > 0) throw new Error(errors);


        users.push(user);
        ctx.status = 201;
    } catch (e) {
        ctx.status = 400;
        ctx.body = e.message;
    }
});
/**
 * 
 * @param {any} app Koa App
 * @returns {void}
 */
export default router;