const express = require('express')

const routes = express.Router()
const authRoutes = require('./auth.routes')
const paymentRoutes = require('./payment.routes')
const customerRoutes = require('./customer.routes')
const transactionRoutes = require('./transaction.routes')

routes.use('/auth', authRoutes)
routes.use('/payment', paymentRoutes)
routes.use('/customer', customerRoutes)
routes.use('/transaction', transactionRoutes)

module.exports = routes
