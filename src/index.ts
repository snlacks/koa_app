import views = require('koa-views');
import logger = require('koa-logger');
import koaBody = require('koa-body');
const router = require('koa-router')();

import apiv1_0Router from './routes/api1_0/';

import Koa = require('koa');

export const app = new Koa();
app.use(views(__dirname + '/views', { extension: 'pug' }));
app.use(logger());
app.use(koaBody());

router.get('/', async ctx => await ctx.render('index'));
router.use(apiv1_0Router.routes())
app.use(router.routes());


// listen
if (!module.parent) app.listen(3000);