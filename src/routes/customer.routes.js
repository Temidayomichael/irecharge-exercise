const express = require('express')
const { protectedRoute } = require('../middleware/protectedRoute.middleware')
const CustomerController = require('../controllers/customer.controller')

const router = express.Router()

router.get('/', CustomerController.getCustomers)
router.get(
	'/:id',
	protectedRoute,
	CustomerController.getCustomer,
)

module.exports = router
