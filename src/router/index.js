const Router = require('koa-router')

const userRouter = require('./user')
const { getIndex } = require('../controller')

const indexRouter = new Router({ prefix: '/' })

indexRouter.get('/', getIndex)

module.exports = {
	indexRouter,
	userRouter,
}
