const User = require('../../model/user')

class UserService {
	/**
	 * @description 用户注册
	 * @param {*} user_name 用户名
	 * @param {*} password 密码
	 */
	createUser = async (user_name, password) => {
		const res = await User.create({ user_name, password })
		return res.dataValues
	}

	/**
	 * @description 获取用户信息
	 * @param {*} param0
	 */
	getUserInfo = async ({ id, user_name, password, is_admin }) => {
		const whereOpt = {}

		id && Object.assign(whereOpt, { id })
		user_name && Object.assign(whereOpt, { user_name })
		password && Object.assign(whereOpt, { password })
		is_admin && Object.assign(whereOpt, { is_admin })

		const res = await User.findOne({
			attributes: ['id', 'user_name', 'password', 'is_admin'],
			where: whereOpt,
		})

		return res ? res.dataValues : null
	}

	/**
	 * @description 根据id更改信息
	 * @param {*} param0
	 */
	updateUserInfoById = async ({ id, user_name, password, is_admin }) => {
		const whereOpt = { id }
		const newUser = {}

		user_name && Object.assign(newUser, { user_name })
		password && Object.assign(newUser, { password })
		is_admin && Object.assign(newUser, { is_admin })

		const res = await User.update(newUser, {
			where: whereOpt,
		})

		return res[0] > 0
	}
}

module.exports = new UserService()
