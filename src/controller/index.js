class Index {
	getIndex = async (ctx, next) => {
		ctx.body = 'index /'
		await next()
	}
}

module.exports = new Index()
