const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../../service/user')
const {
	userFormatError,
	userAlreadyExist,
	userDoesNotExist,
	loginValidator,
	validPasswordError,
	passwordFormatError,
} = require('../../constant/error.type')

/**
 * @description 验证参数
 * @param {*} ctx
 * @param {*} next
 */
const userValidator = async (ctx, next) => {
	const { user_name, password } = ctx.request.body

	if (!user_name || !password) {
		ctx.app.emit('error', userFormatError, ctx)
		return
	}
	await next()
}

/**
 * @description 校验传入的参数是否已经存在
 * @param {*} ctx
 * @param {*} next
 */
const verifyUser = async (ctx, next) => {
	const { user_name } = ctx.request.body
	if (await getUserInfo({ user_name })) {
		ctx.app.emit('error', userAlreadyExist, ctx)
		return
	}
	await next()
}

/**
 * @description 加密密码
 * @param {*} ctx
 * @param {*} next
 */
const cryptPassWord = async (ctx, next) => {
	const { password } = ctx.request.body
	const salt = bcrypt.genSaltSync(10)
	const hash = bcrypt.hashSync(password, salt)

	ctx.request.body.password = hash

	await next()
}

/**
 * @description 验证登陆
 * @param {*} ctx
 * @param {*} next
 */
const verifyLogin = async (ctx, next) => {
	const { user_name, password } = ctx.request.body
	try {
		const res = await getUserInfo({ user_name })
		if (!res) return ctx.app.emit('error', userDoesNotExist, ctx)
		const { password: hash } = res
		const isMatchPassword = await bcrypt.compare(password, hash)
		if (!isMatchPassword) return ctx.app.emit('error', validPasswordError, ctx)
		await next()
	} catch (err) {
		console.error(err, '验证密码失败')
		ctx.app.emit('error', loginValidator, ctx)
	}
}

/**
 * @description 密码不允许为空
 * @param {*} ctx
 * @param {*} next
 */
const passwordFormat = async (ctx, next) => {
	const { password } = ctx.request.body
	if (!password) return ctx.app.emit('error', passwordFormatError, ctx)
	await next()
}

module.exports = {
	userValidator,
	verifyUser,
	cryptPassWord,
	verifyLogin,
	passwordFormat,
}
