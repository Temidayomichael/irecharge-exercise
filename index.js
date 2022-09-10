var express = require('express')
var logger = require('morgan')
const bodyParser = require('body-parser')
const routes = require('./src/routes')
const { errorHandler } = require('./src/middleware/errorHandler')
const cors = require('cors')
const { config } = require('./config')

const {
	app: { port },
} = config

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	res.status(404).json({
		message: 'No such route exists',
	})
})

// error handler
app.use(errorHandler)
app.listen(port, function () {
	console.log(`Server is running on port ${port}`)
})

module.exports = app
