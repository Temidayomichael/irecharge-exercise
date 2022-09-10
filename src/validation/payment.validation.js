const { body, param } = require('express-validator')

exports.makePaymentValidator = [
	body('amount').isFloat({ min: 0.01 }).withMessage('Amount is invalid'),
	body('description')
		.isLength({ min: 1 })
		.withMessage('Description is invalid'),
	body('cardNumber')
		.isLength({ min: 16 })
		.withMessage('Card number is invalid'),
	body('cardExpiryMonth')
		.isInt({ min: 1, max: 12 })
		.withMessage('Card expiry month is invalid'),
	body('cardExpiryYear')
		.isInt({ min: 2020, max: 2050 })
		.withMessage('Card expiry year is invalid'),
	body('cardCvc').isLength({ min: 3 }).withMessage('Card cvc is invalid'),
	body('purpose').isLength({ min: 1 }).withMessage('Purpose is invalid'),
	body('pin').isLength({ min: 4 }).withMessage('Pin is invalid'),
]

exports.otpValidator = [
	body('otp').isLength({ min: 4 }).withMessage('OTP is invalid'),
	body('transactionId')
		.isLength({ min: 1 })
		.withMessage('Transaction id is invalid'),
]
