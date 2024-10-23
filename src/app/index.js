const Koa = require('koa')
const { koaBody } = require('koa-body')

const { indexRouter, userRouter } = require('../router')
const errHandle = require('./errHhandle')

const app = new Koa()

app.use(koaBody()).use(indexRouter.routes()).use(userRouter.routes())

app.on('error', errHandle)

module.exports = app
