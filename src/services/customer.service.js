const { PrismaClient } = require('@prisma/client')
const { withExclude } = require('prisma-exclude')

const prisma = withExclude(new PrismaClient())

exports.getCustomer = async ({ id }) => {
	try {
		const customer = await prisma.customer.findFirst({
			where: {
				id,
			},
			select: prisma.$exclude('customer', ['password', 'refreshToken']),
		})
		if (!customer) {
			throw new Error('customer not found')
		}
		return customer
	} catch (error) {
		throw error
	}
}

exports.getCustomers = async () => {
	try {
		const customers = await prisma.customer.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			select: prisma.$exclude('customer', ['password', 'refreshToken']),
		})
		delete customers.password
		return customers
	} catch (error) {
		throw error
	}
}

exports.deleteCustomer = async (id) => {
	try {
		const customer = await prisma.customer.delete({
			where: {
				id,
			},
		})
		return customer
	} catch (error) {
		throw error
	}
}
