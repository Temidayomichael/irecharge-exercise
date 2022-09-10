// test cutomer endpoint

var app = require('../index'),
	chai = require('chai'),
	request = require('supertest')

var expect = chai.expect

describe('Customer Endpoint Tests', function () {
	describe('# Get all customers', function () {
		it(' should return a list of customers ', function (done) {
			request(app)
				.get('/api/customer')
				.end(function (err, res) {
					expect(res.statusCode).to.equal(200)
					expect(res.body.data).to.be.an('array')
					done()
				})
		})
	})

	// test user creation
	describe('# Create a new customer', function () {
		const data = {
			email: 'dayooo.oladele@gmail.com',
			password: '1234567',
			confirmPassword: '1234567',
			name: 'Oladele dayo',
			username: 'Oladeledayoo',
			phoneNumber: '+2348102334562',
		}
		it('should create a new customer', function (done) {
			request(app)
				.post('/api/auth/register')
				.send(data)
				.end(function (err, res) {
					expect(res.statusCode).to.equal(201)
					expect(res.body.error).to.equal(false)
					expect(res.body.data).to.be.an('object')
					done()
				})
		})
		it('should flag unique error', function (done) {
			request(app)
				.post('/api/auth/register')
				.send(data)
				.end(function (err, res) {
					expect(res.statusCode).to.equal(500)
					expect(res.body.error).to.equal(true)
					done()
				})
		})
	})
})
