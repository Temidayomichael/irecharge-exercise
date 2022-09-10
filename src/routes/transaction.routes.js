const express = require('express')
const { protectedRoute } = require('../middleware/protectedRoute.middleware')
const transactionController = require('../controllers/transaction.controller')

const router = express.Router()

router.get('/', transactionController.getAllTransactions)
router.get('/:id', transactionController.getTransaction)
router.get('/customer/:id', transactionController.getTransactionByCustomerId)

module.exports = router
