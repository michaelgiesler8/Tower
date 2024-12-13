require('dotenv').config();

require = require('esm-wallaby')(module);

console.log('Environmental Variables');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('CONNECTION_STRING', process.env.CONNECTION_STRING);
console.log('AUTH_DOMAIN:', process.env.AUTH_DOMAIN);
console.log('AUTH_CLIENT_ID:', process.env.AUTH_CLIENT_ID);
console.log('API_BASE_URL:', process.env.API_BASE_URL);

module.exports = require('./src/main')
