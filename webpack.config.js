const dev = require('./config/webpack.dev.js')
// const test = require('./config/webpack.test.js')
// const prod = require('./config/webpack.prod.js')
//
// const getLoaderConfig = () => {
//   switch (process.env.NODE_ENV) {
//     case 'process': return prod
//     case 'test': return test
//     default: return dev
//   }
// }

module.exports = dev
