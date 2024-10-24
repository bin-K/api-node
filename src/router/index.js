const path = require('path')

const Router = require('koa-router')

const { readFile } = require('../utils')
const { getIndex } = require('../controller')

// #region 路由声明
const router = new Router()
router.get('/', getIndex)
// #endregion

// #region 注册路由
readFile(path.resolve(__dirname, './'), (fileName) => {
	if (fileName !== path.resolve(__dirname, './index.js')) {
		const r = require(fileName)
		router.use(r.routes())
	}
})
// #endregion

module.exports = router
