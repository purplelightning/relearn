module.exports = {
  port: 2080,
  session: {
    secret: 'sblog',
    key: 'sblog',
    maxAge: 2592000000
  },
  mongodb: 'mongodb://localhost:27017/sblog'
}