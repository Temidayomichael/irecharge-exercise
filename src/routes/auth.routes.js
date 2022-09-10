const express = require('express')
const authController = require('../controllers/auth.controller')
const { protectedRoute } = require('../middleware/protectedRoute.middleware')
const {
	registerValidator,
	loginValidator,
} = require('../validation/auth.validation')
const router = express.Router()

router.post('/register', registerValidator, authController.register)
router.post('/login', loginValidator, authController.login)
router.get('/me', protectedRoute, authController.me)

module.exports = router
