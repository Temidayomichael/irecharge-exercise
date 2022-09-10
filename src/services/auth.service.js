const { PrismaClient } = require('@prisma/client')
const { withExclude } = require('prisma-exclude')

const prisma = withExclude(new PrismaClient())
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('../../config')
const {
	jwt: { refreshToken: refreshTokenData, token: tokenData },
} = config

async function getTokens(customer) {
	const { id, email, name } = customer
	const payload = {
		id,
		email,
		name,
	}

	const tokenSecret = tokenData.secret
	const refreshTokenSecret = refreshTokenData.secret

	const token = jwt.sign(payload, tokenSecret, {
		expiresIn: tokenData.expiresIn,
	})
	const refreshToken = jwt.sign(payload, refreshTokenSecret, {
		expiresIn: refreshTokenData.expiresIn,
	})

	return { token, refreshToken }
}

exports.register = async (data) => {
	try {
		const { token, refreshToken } = await getTokens(data)
		const customer = await prisma.customer.create({
			data: {
				...data,
				password: await bcrypt.hash(data.password, 10),
				refreshToken,
			},
		})
		// exclude password from customer object
		delete customer.password
		return { customer, token, refreshToken }
	} catch (error) {
		throw error
	}
}

exports.login = async (email, password) => {
	try {
		const customer = await prisma.customer.findFirst({
			where: {
				email,
			},
		})

		if (!customer) {
			throw new Error('customer not found')
		}
		const isPasswordValid = await bcrypt.compare(password, customer.password)
		if (!isPasswordValid) {
			throw new Error('Invalid password')
		}
		const { token, refreshToken } = await getTokens(customer)
		// exclude password from customer object
		delete customer.password
		return { customer, token, refreshToken }
	} catch (error) {
		console.log(error)
		throw error
	}
}

exports.refresh = async (data) => {
	try {
		const customer = await prisma.customer.findOne({
			where: {
				refreshToken: data.refreshToken,
			},
			select: prisma.$exclude('customer', ['password']),
		})
		if (!customer) {
			throw new Error('customer not found')
		}
		const { token, refreshToken } = await getTokens(customer)

		await prisma.customer.update({
			where: {
				id: customer.id,
			},
			data: {
				refreshToken: refreshToken,
			},
		})

		return { customer, token }
	} catch (error) {
		throw error
	}
}

exports.logout = async (data) => {
	try {
		const customer = await prisma.customer.findOne({
			where: {
				refreshToken: data.refreshToken,
			},
		})
		if (!customer) {
			throw new Error('customer not found')
		}
		await prisma.customer.update({
			where: {
				id: customer.id,
			},
			data: {
				refreshToken: null,
			},
		})
		return { customer }
	} catch (error) {
		throw error
	}
}

exports.verifyToken = async (token) => {
	try {
		const payload = jwt.verify(token, tokenData.secret)
		const customer = await prisma.customer.findUnique({
			where: {
				id: payload.id,
			},
		})

		if (!customer) {
			throw new Error('customer not found')
		}
		return customer
	} catch (error) {
		throw error
	}
}

exports.me = async (data) => {
	try {
		const customer = await prisma.customer.findUnique({
			where: {
				id: data.id,
			},
		})
		if (!customer) {
			throw new Error('customer not found')
		}
		return customer
	} catch (error) {
		throw error
	}
}
