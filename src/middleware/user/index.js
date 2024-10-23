const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../../service/user')
const { userFormatError, userAlreadyExist } = require('../../constant/error.type')

// 验证参数
const userValidator = async (ctx, next) => {
	const { user_name, password } = ctx.request.body

	if (!user_name || !password) {
		ctx.app.emit('error', userFormatError, ctx)
		return
	}
	await next()
}

// 校验传入的参数是否已经存在
const verifyUser = async (ctx, next) => {
	const { user_name } = ctx.request.body
	if (await getUserInfo({ user_name })) {
		ctx.app.emit('error', userAlreadyExist, ctx)
		return
	}
	await next()
}

// 加密密码
const cryptPassWord = async (ctx, next) => {
	const { user_name } = ctx.request.body
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(user_name, salt)

	ctx.request.body.password = hash

	await next()
}

module.exports = {
	userValidator,
	verifyUser,
	cryptPassWord,
}
