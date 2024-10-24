const jwt = require('jsonwebtoken')
const { JWT_SCRECT } = require('../../config/config.default')
const { tokenExpiredError, jsonWebTokenError, tokenValidError } = require('../../constant/error.type')

const auth = async (ctx, next) => {
	const { authorization } = ctx.request.header
	const token = authorization.replace('Bearer ', '')
	try {
		const user = jwt.verify(token, JWT_SCRECT)
		if (!user) return ctx.app.emit('error', tokenValidError, ctx)
		ctx.state.user = user
		await next()
	} catch (err) {
		console.error(err, 'token验证失败')
		switch (err.name) {
			case 'TokenExpiredError':
				ctx.app.emit('error', tokenExpiredError, ctx)
				break
			case 'JsonWebTokenError':
				ctx.app.emit('error', jsonWebTokenError, ctx)
				break
		}
	}
}

module.exports = {
	auth,
}
