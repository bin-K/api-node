const Router = require('koa-router')

const { getIndex, register, login, changePassword } = require('../../controller/user')
const { userValidator, verifyUser, cryptPassWord, verifyLogin, passwordFormat } = require('../../middleware/user')
const { auth } = require('../../middleware/auth')

const userRouter = new Router({ prefix: '/user' })

userRouter.get('/', getIndex)

userRouter.post('/register', userValidator, verifyUser, cryptPassWord, register)

userRouter.post('/login', userValidator, verifyLogin, login)

userRouter.patch('/changePassword', passwordFormat, auth, cryptPassWord, changePassword)

module.exports = userRouter
