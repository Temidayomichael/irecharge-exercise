const { validationResult } = require('express-validator')
const AuthService = require('../services/auth.service')


exports.register = async (req, res, next) => {
	const error = validationResult(req).formatWith(({ msg }) => msg)

	if (!error.isEmpty()) {
		return res.status(422).json({
			error: true,
			message: error.array(),
		})
	}
	try {
		const { confirmPassword, ...rest } = req.body

		const user = await AuthService.register(rest)
		res.cookie('refreshToken', user.refreshToken, {
			httpOnly: true,
			path: '/api/auth/refresh_token',
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		})
		delete user.customer.refreshToken

		
		res.status(201).json({
			error: false,
			message: 'User created successfully',
			data: { ...user },
		})
		
	} catch (err) {
		next(err)
	}
}

exports.login = async (req, res, next) => {
	const error = validationResult(req).formatWith(({ msg }) => msg)

	if (!error.isEmpty()) {
		return res.status(422).json({
			error: true,
			message: error.array(),
		})
	}
	try {
		const { email, password } = req.body
		const user = await AuthService.login(email, password)

		res.cookie('refreshToken', user.refreshToken, {
			httpOnly: true,
			path: '/api/auth/refresh_token',
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		})
		delete user.customer.refreshToken
		delete user.refreshToken

		res.json({
			error: false,
			message: 'User authenticated successfully',
			data: { ...user },
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}

exports.logout = async (req, res, next) => {
	try {
		const user = await AuthService.logout(req.body.refreshToken)
		res.json({
			error: false,
			message: 'User logged out successfully',
			user: user,
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}

exports.refresh = async (req, res, next) => {
	try {
		const user = await AuthService.refresh(req.body.refreshToken)
		const { token } = AuthService.getTokens(user)
		res.json({
			error: false,
			message: 'User refreshed successfully',
			user: user,
			token,
		})
	} catch (err) {
		console.log(err)
		next(err)
	}
}

exports.me = async (req, res, next) => {
	try {
		const user = await AuthService.me(req.user)
		delete user.refreshToken
		delete user.password

		res.json({
			error: false,
			message: 'User retrieved successfully',
			user: user,
		})
	} catch (err) {
		next(err)
	}
}
