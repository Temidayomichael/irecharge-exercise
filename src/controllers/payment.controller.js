const { validationResult } = require('express-validator')
const PaymentService = require('../services/payment.service')

exports.makePayment = async (req, res, next) => {
	const error = validationResult(req).formatWith(({ msg }) => msg)

	if (!error.isEmpty()) {
		return res.status(422).json({
			error: true,
			message: error.array(),
		})
	}

	try {
		const payment = await PaymentService.makePayment({
			data: req.body,
			user: req.user,
		})
		res.json({
			error: false,
			message: 'Payment successful',
			data: { ...payment },
		})
	} catch (err) {
		next(err)
	}
}

exports.otpValidate = async (req, res, next) => {
	const error = validationResult(req).formatWith(({ msg }) => msg)

	if (!error.isEmpty()) {
		return res.status(422).json({
			error: true,
			message: error.array(),
		})
	}

	try {
		console.log(req.body)
		const payment = await PaymentService.otpValidate({
			data: req.body,
		})
		res.json({
			error: false,
			message: 'Payment validated successfully',
			data: { ...payment },
		})
	} catch (err) {
		next(err)
	}
}
