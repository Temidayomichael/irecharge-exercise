const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.getTransaction = async ({ id }) => {
	try {
		const transaction = await prisma.transaction.findFirst({
			where: {
				id,
			},
		})
		if (!transaction) {
			throw new Error('transaction not found')
		}
		return transaction
	} catch (error) {
		throw error
	}
}

exports.getTransactions = async () => {
	try {
		const transactions = await prisma.transaction.findMany()
		return transactions
	} catch (error) {
		throw error
	}
}

exports.createTransaction = async (data) => {
	try {
		const transaction = await prisma.transaction.create({
			data: {
				...data,
			},
		})
		return transaction
	} catch (error) {
		throw error
	}
}

exports.updateTransaction = async (id, data) => {
	try {
		const transaction = await prisma.transaction.update({
			where: {
				id,
			},
			data: {
				...data,
			},
		})
		return transaction
	} catch (error) {
		throw error
	}
}

exports.getTransactionsByCustomer = async ({ id }) => {
	try {
		const transactions = await prisma.transaction.findMany({
			where: {
				customerId: id,
			},
		})
		return transactions
	} catch (error) {
		throw error
	}
}

exports.deleteTransaction = async ({ id }) => {
	try {
		const transaction = await prisma.transaction.delete({
			where: {
				id,
			},
		})
		return transaction
	} catch (error) {
		throw error
	}
}
