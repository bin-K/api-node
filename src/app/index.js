const Koa = require('koa')
const { koaBody } = require('koa-body')

const router = require('../router')
const errHandle = require('./errHhandle')

const app = new Koa()

app.use(koaBody()).use(router.routes()).use(router.allowedMethods())

app.on('error', errHandle)

module.exports = app
