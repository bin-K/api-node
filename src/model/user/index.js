const { DataTypes } = require('sequelize')

const sequelize = require('../../db')

const User = sequelize.define('user', {
	user_name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
		comment: '用户名，唯一',
	},
	password: {
		type: DataTypes.CHAR(64),
		allowNull: false,
		comment: '密码',
	},
	is_admin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: 0,
		comment: '是否为管理员，0：不是管理员（默认），1：是管理员',
	},
})

// 创建表，如果表存在会删除表重新创建
// User.sync({ force: true })

module.exports = User
