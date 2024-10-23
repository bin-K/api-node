const code = require('../constant/code')

const errHandle = (err, ctx) => {
	const status = code[err.code] ? code[err.code] : 500
	ctx.status = status
	ctx.body = err
}

module.exports = errHandle
