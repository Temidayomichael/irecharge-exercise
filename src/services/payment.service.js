const { PrismaClient } = require('@prisma/client')
const { withExclude } = require('prisma-exclude')

const prisma = withExclude(new PrismaClient())
const Flutterwave = require('flutterwave-node-v3')
const { config } = require('../../config')

const {
	app: { url },
	flutterwave: { public_key, secret_key, encryption_key },
} = config

const flw = new Flutterwave(public_key, secret_key)

exports.makePayment = async ({ data, user }) => {
	try {
		console.log('in service')
		let res

		const payload = {
			card_number: data.cardNumber,
			cvv: data.cardCvc.toString(),
			expiry_month: data.cardExpiryMonth,
			expiry_year: data.cardExpiryYear,
			currency: 'NGN',
			amount: data.amount,
			redirect_url: `${url}/payment/callback`,
			fullname: user.name,
			email: user.email,
			phone_number: user.phoneNumber,
			enckey: encryption_key,
			tx_ref: 'example01',
		}

		const response = await flw.Charge.card(payload)
		console.log('response flutterwave:', response)

		// Authorizing transactions

		// For PIN transactions
		if (response.meta.authorization.mode === 'pin') {
			let payload2 = payload
			payload2.authorization = {
				mode: 'pin',
				fields: ['pin'],
				pin: data.pin.toString(),
			}

			const reCallCharge = await flw.Charge.card(payload2)

			console.log('reCallCharge:', reCallCharge)

			const transaction = await prisma.transaction.create({
				data: {
					customerId: user.id,
					amount: data.amount,
					metaData: reCallCharge.data,
					purpose: data.purpose,
				},
			})
			res = transaction
		}
		// For 3DS or VBV transactions, redirect users to their issue to authorize the transaction
		if (response.meta.authorization.mode === 'redirect') {
			var url = response.meta.authorization.redirect
			open(url)

			const transaction = await prisma.transaction.create({
				data: {
					customerId: user.id,
					amount: data.amount,
					metaData: response,
					purpose: data.purpose,
				},
			})
			res = { response, transaction }
		}

		return res
	} catch (error) {
		console.log(error)
		throw error
	}
}

exports.otpValidate = async ({ data }) => {
	try {
		const transaction = await prisma.transaction.findFirst({
			where: {
				id: data.transactionId,
			},
		})
		console.log('transaction:', transaction)
		// Add the OTP to authorize the transaction
		const callValidate = await flw.Charge.validate({
			otp: data.otp,
			flw_ref: transaction.metaData.flw_ref,
		})
		console.log(callValidate)

		const transactionUpdate = await prisma.transaction.update({
			where: {
				id: data.transactionId,
			},
			data: {
				metaData: callValidate.data,
				status: 'SUCCESS',
			},
		})
		return transactionUpdate
	} catch (error) {
		console.log(error)
		throw error
	}
}
