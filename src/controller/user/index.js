const jwt = require('jsonwebtoken')

const { createUser, getUserInfo, updateUserInfoById } = require('../../service/user')
const { success } = require('../../constant/success.type')
const { userValidator, loginValidator, changePasswordError } = require('../../constant/error.type')
const { JWT_SCRECT } = require('../../config/config.default')

class UserController {
	getIndex = async (ctx, next) => {
		ctx.body = 'user index /'
		await next()
	}

	/**
	 * @description 用户注册
	 * @param {*} ctx
	 * @param {*} next
	 */
	register = async (ctx, next) => {
		// 获取参数
		const { user_name, password } = ctx.request.body
		// 操作数据库
		try {
			const res = await createUser(user_name, password)
			// 返回结果
			success.message = '用户注册成功'
			success.result = {
				id: res.id,
				user_name: res.user_name,
			}
			ctx.body = success
			await next()
		} catch (err) {
			console.error(err)
			ctx.app.emit('error', userValidator, ctx)
		}
	}

	/**
	 * @description 用户登录
	 * @param {*} ctx
	 * @param {*} next
	 */
	login = async (ctx, next) => {
		const { user_name } = ctx.request.body
		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
			const { password, ...res } = await getUserInfo({ user_name })
			const token = jwt.sign(res, JWT_SCRECT, { expiresIn: '1d' })
			success.message = '登陆成功'
			success.result = {
				token,
			}
			ctx.body = success
			await next()
		} catch (err) {
			console.error(err, '登录失败')
			ctx.app.emit('error', loginValidator, ctx)
		}
	}

	/**
	 * @description 修改密码
	 * @param {*} ctx
	 * @param {*} next
	 */
	changePassword = async (ctx, next) => {
		const { id, user_name } = ctx.state.user
		const { password } = ctx.request.body
		try {
			const res = await updateUserInfoById({ id, password })
			if (res) {
				success.message = `${user_name}更改密码成功`
				success.result = {
					user_name,
				}
				ctx.body = success
				await next()
			} else {
				ctx.app.emit('error', changePasswordError, ctx)
			}
		} catch (err) {
			console.error(err, '更改密码失败')
			ctx.app.emit('error', changePasswordError, ctx)
		}
	}
}

module.exports = new UserController()
