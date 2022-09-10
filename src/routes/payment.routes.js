const express = require('express')
const { protectedRoute } = require('../middleware/protectedRoute.middleware')
const paymentController = require('../controllers/payment.controller')
const { makePaymentValidator, otpValidator } = require('../validation/payment.validation')

const router = express.Router()

router.post(
	'/',
	protectedRoute,
	makePaymentValidator,
	paymentController.makePayment,
)

router.post(
	'/otp',
	protectedRoute,
	otpValidator,
	paymentController.otpValidate,
)

module.exports = router
