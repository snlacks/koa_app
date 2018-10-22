const views = require('koa-views');
const logger = require('koa-logger');
const router = require('koa-router')();
const koaBody = require('koa-body');

const Koa = require('koa');

export const app = new Koa();
app.use(views(__dirname + '/views', { extension: 'pug' }));
app.use(logger());
app.use(koaBody());

router.get('/', async ctx => await ctx.render('index'));
app.use(router.routes());


// listen
if (!module.parent) app.listen(3000);