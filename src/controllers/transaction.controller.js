const { validationResult } = require('express-validator')
const TransactionService = require('../services/transaction.service')

exports.getAllTransactions = async (req, res, next) => {
	try {
		const transactions = await TransactionService.getTransactions()
		res.json({
			error: false,
			message: 'Transactions fetched successfully',
			data: [...transactions],
		})
	} catch (err) {
		next(err)
	}
}

exports.getTransaction = async (req, res, next) => {
	try {
		const { id } = req.params
		const transaction = await TransactionService.getTransaction({
			id,
		})
		res.json({
			error: false,
			message: 'Transaction fetched successfully',
			data: { ...transaction },
		})
	} catch (err) {
		next(err)
	}
}

exports.getTransactionsByCustomerId = async (req, res, next) => {
	try {
		const { id } = req.params
		const transactions = await TransactionService.getTransactionsByCustomer({
			id,
		})
		res.json({
			error: false,
			message: 'Transactions fetched successfully',
			data: { ...transactions },
		})
	} catch (err) {
		next(err)
	}
}
