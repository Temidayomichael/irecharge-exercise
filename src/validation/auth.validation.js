const { body } = require('express-validator')

exports.registerValidator = [
	body('email').isEmail().withMessage('Email is invalid'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Passwords do not match')
		}
		return true
	}),
	body('name')
		.isLength({ min: 3 })
		.withMessage('Name must be at least 3 characters long'),
	body('username')
		.isLength({ min: 3 })
		.withMessage('Username must be at least 3 characters long'),
	body('phoneNumber')
		.isMobilePhone('en-NG')
		.withMessage('Phone number is invalid'),
]

exports.loginValidator = [
	body('email').isEmail().withMessage('Email is invalid'),
	body('password').isLength({ min: 6 }).withMessage('Password is invalid'),
]
