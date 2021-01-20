const mongoose = require('mongoose')

UserSchema = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  password: {
    type:String, required: true
  },
  avatar: {
    type: String, required: true
  },
  gender: {
    type: String, enum: ['m', 'f', 'x'], default: 'x'
  },
  bio: {
    type: String, required: true
  },
  phone: {
    type: Number, required: false
  },

})

let UserModel = mongoose.model('user', UserSchema)
let User = UserModel

let express = require('express');
let router = express.Router();

const checkNotLogin = require('../../middlewares/check').checkNotLogin
const checkLogin = require('../../middlewares/check').checkLogin

router.get('/info', function (req, res, next) {
  let obj = {
    data: 'info'
  }
  res.end(JSON.stringify(obj));
});

router.get('/login', checkNotLogin, (req, res, next) => {
  res.send('登录页')
})

router.post('/login', checkNotLogin, (req, res, next) => {
  res.send('登录')
})

router.get('/register', checkNotLogin, (req, res, next) => {
  res.send('注册页')
})

router.post('/register', checkNotLogin, (req, res, next) => {
  res.send('注册')
})

router.get('/signout', checkLogin, (req, res, next) => {
  res.send('登出')
})

module.exports = router;