const { createUser } = require('../../service/user')
const { userCreateSuccess } = require('../../constant/success.type')
const { userValidator } = require('../../constant/error.type')

class UserController {
	getIndex = async (ctx, next) => {
		ctx.body = 'user index /'
		await next()
	}

	register = async (ctx, next) => {
		// 获取参数
		const { user_name, password } = ctx.request.body
		// 操作数据库
		try {
			const res = await createUser(user_name, password)
			console.log(res)
			// 返回结果
			userCreateSuccess.result = {
				id: res.id,
				user_name: res.user_name,
			}
			ctx.body = userCreateSuccess
		} catch (err) {
			console.error(err)
			ctx.app.emit('error', userValidator, ctx)
			return
		}

		await next()
	}
}

module.exports = new UserController()
