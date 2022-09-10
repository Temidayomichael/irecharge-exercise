const AuthService = require('../services/auth.service')

const protectedRoute = async (req, res, next) => {
	try {
		const bearerToken = req.headers.authorization
		if (!bearerToken) {
			throw new Error('Bearer token not found')
		}
		const token = bearerToken.split(' ')[1]

		const user = await AuthService.verifyToken(token)
		if (!user) {
			throw new Error('Invalid token')
		}
		req.user = user
		next()
	} catch (err) {
		next(err)
	}
}
exports.protectedRoute = protectedRoute
