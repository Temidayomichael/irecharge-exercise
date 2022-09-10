const app = require('../index'),
	chai = require('chai'),
	request = require('supertest')

const expect = chai.expect

describe('Transaction Endpoint Tests', function () {
	let userData
	//login
	describe('# Login', function () {
		it('should return a token', function (done) {
			request(app)
				.post('/api/auth/login')
				.send({
					email: 'dayooo.oladele@gmail.com',
					password: '1234567',
				})
				.end(function (err, res) {
					expect(res.statusCode).to.equal(200)
					expect(res.body.error).to.equal(false)
					expect(res.body.data).to.be.an('object')
					userData = res.body.data

					done()
				})
		})
	})
	describe('# Get all transactions', function () {
		it(' should return a list of transactions ', function (done) {
			request(app)
				.get('/api/transaction')
				.end(function (err, res) {
					expect(res.statusCode).to.equal(200)
					expect(res.body.data).to.be.an('array')
					done()
				})
		})
	})

	// test user creation
	describe('# Create a new transaction', function () {
		const data = {
			amount: 200.4,
			description: 'Description is invalid',
			cardNumber: '5531886652142950',
			cardExpiryMonth: 9,
			cardExpiryYear: 2032,
			cardCvc: 564,
			pin: '3310',
			purpose: 'Purpose is invalid',
		}
		let transactionId = ''
		it('should create a new transaction', function (done) {
			request(app)
				.post('/api/payment')
				.set('Authorization', `Bearer ${userData.token}`)
				.send(data)
				.end(function (err, res) {
					expect(res.statusCode).to.equal(201)
					expect(res.body.error).to.equal(false)
					expect(res.body.data).to.be.an('object')
					transactionId = res.body.data.id
					done()
				})
		})

		const verifyData = {
			id: transactionId,
			otp: '12345',
		}
		it('should verify transaction otp', function (done) {
			request(app)
				.post('/api/transaction/verify')
				.set('Authorization', `Bearer ${userData.token}`)
				.send(verifyData)
				.end(function (err, res) {
					expect(res.statusCode).to.equal(200)
					expect(res.body.error).to.equal(false)
					expect(res.body.data).to.be.an('object')
					done()
				})
		})
	})
})
