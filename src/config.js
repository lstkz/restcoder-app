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
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'RestCoder',
    description: 'Practice technologies',
    head: {
      titleTemplate: 'RestCoder: %s',
      meta: [
        {name: 'description', content: 'Practice technologies'},
        {charset: 'utf-8'},
      ]
    }
  },

}, environment);
