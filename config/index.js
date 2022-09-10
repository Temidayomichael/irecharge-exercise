// config.js
const env = process.env.NODE_ENV // 'dev' or 'test'

const dev = {
	app: {
		port: process.env.PORT || 6000,
		url: process.env.APP_URL,
	},
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		name: process.env.DB_NAME,
	},
	jwt: {
		refreshToken: {
			secret: process.env.REFRESH_TOKEN_SECRET,
			expiresIn: '1d',
		},
		token: {
			secret: process.env.JWT_SECRET,
			expiresIn: '1h',
		},
	},
	flutterwave: {
		public_key: process.env.FLUTTERWAVE_PUBLICKEY,
		secret_key: process.env.FLUTTERWAVE_SECRETKEY,
		encryption_key: process.env.FLUTTERWAVE_ENCRYPTIONKEY,
	},
}

const test = {
	app: {
		port: 6000,
	},
	db: {
		host: 'localhostyyy',
		port: 27017,
		name: 'test',
	},
}

const config = {
	dev,
	test,
}

exports.config = config[env]
