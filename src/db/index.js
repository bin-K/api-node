const Sequelize = require('sequelize')

const { MYSQL_HOST, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DIALECT } = require('../config/config.default')

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, {
	host: MYSQL_HOST,
	dialect: MYSQL_DIALECT,
})

// 测试数据库连接
// sequelize
// 	.authenticate()
// 	.then(() => {
// 		console.log('Connection has been established successfully.')
// 	})
// 	.catch((err) => {
// 		console.error('Unable to connect to the database:', err)
// 	})

module.exports = sequelize
