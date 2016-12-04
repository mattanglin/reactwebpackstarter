require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiProtocol: process.env.APIPROTOCOL || 'https',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  apiPath: process.env.APIPATH || '',
  apiToken: process.env.APITOKEN,
  app: {
    title: 'React Webpack Starter',
    description: 'All your base are belong to us.',
    head: {
      titleTemplate: 'NDA: %s',
      meta: [
        { name: 'description', content: 'All your base are belong to us.' },
        { charset: 'utf-8' }
      ]
    }
  },

}, environment);
