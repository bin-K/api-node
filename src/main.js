const app = require('./app')

const { APP_PORT } = require('./config/config.default')

app.listen(APP_PORT, () => {
	console.log(`Server is running at http://127.0.0.1:${APP_PORT}`)
})
