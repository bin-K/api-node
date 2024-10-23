const Router = require('koa-router')

const { getIndex, register } = require('../../controller/user')
const { userValidator, verifyUser, cryptPassWord } = require('../../middleware/user')

const userRouter = new Router({ prefix: '/user' })

userRouter.get('/', getIndex)

userRouter.post('/register', userValidator, verifyUser, cryptPassWord, register)

module.exports = userRouter
