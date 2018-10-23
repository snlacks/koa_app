const userRouter = require('koa-router')({ prefix: '/api.v1.0/users'});
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

userRouter.get('/', ctx => {
    ctx.body = users;
});


/**
 * 
 * @param {any} app Koa App
 * @returns {void}
 */
export default function(app): void {
    debugger;
    app.use(userRouter.routes());
}