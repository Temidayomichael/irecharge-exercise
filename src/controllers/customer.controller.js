const { validationResult } = require('express-validator')
const CustomerService = require('../services/customer.service')

exports.getCustomer = async (req, res, next) => {
	const error = validationResult(req).formatWith(({ msg }) => msg)

	if (!error.isEmpty()) {
		return res.status(422).json({
			error: true,
			message: error.array(),
		})
	}

	try {
		const { id } = req.params

		const customer = await CustomerService.getCustomer(id)

		res.json({
			error: false,
			message: 'Customer retrieved successfully',
			data: { ...customer },
		})
	} catch (err) {
		next(err)
	}
}

exports.getCustomers = async (req, res, next) => {
	try {
		const customers = await CustomerService.getCustomers()

		res.json({
			error: false,
			message: 'Customers retrieved successfully',
			data: [...customers],
		})
	} catch (err) {
		next(err)
	}
}
