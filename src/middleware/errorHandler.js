const { Prisma } = require('@prisma/client')

const errorHandler = (err, req, res, next) => {
	let prismaError

	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		if (err.code === 'P2002') {
			console.log('There is a unique constraint violation.')
			prismaError = {
				message: 'There is a unique constraint violation.',
			}
		}
	}
	res.status(err.status || 500)
	res.json({
		error: true,
		message: prismaError.message || err.message,
	})
}

exports.errorHandler = errorHandler
