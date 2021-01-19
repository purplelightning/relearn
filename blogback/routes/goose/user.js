var express = require('express');
var router = express.Router();

const checkNotLogin = require('../../middlewares/check').checkNotLogin
const checkLogin = require('../../middlewares/check').checkLogin

router.get('/info', function (req, res, next) {
  let obj = {
    data: 'info'
  }
  res.end(JSON.stringify(obj));
});

router.get('/signin', checkNotLogin, (req, res, next) => {
  res.send('登录页')
})

router.post('/signin', checkNotLogin, (req, res, next) => {
  res.send('登录')
})

router.get('/signup', checkNotLogin, (req, res, next) => {
  res.send('注册页')
})

router.post('/signup', checkNotLogin, (req, res, next) => {
  res.send('注册')
})

router.get('/signout', checkLogin, (req, res, next) => {
  res.send('登出')
})

module.exports = router;