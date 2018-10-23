import * as Router from 'koa-router';
import userRouter from './users';

const apiRouter = new Router({ prefix: '/api.v1.0'});

apiRouter.use('/users', userRouter.routes());

export default apiRouter;