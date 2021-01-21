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

const fs = require('fs')
const path = require('path')
const sha1 =require('sha1')
var multer =require('multer')
var avatarUpload = multer({dest: 'public/avatar/'})


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
  // res.send('注册页')
})

router.post('/register', checkNotLogin, avatarUpload.single('avatar'), (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  console.log(req.body)
  console.log(req.file)
  console.log(req.body.avatar)
  console.log(req.body.avatar.file)
  User.find({name: req.body.name}, (err, docs)=>{
    if(err){
      console.log(err)
      return
    }
    if(docs.length){
      res.end('{"err":"该用户名已注册"}')
    }else{
      let pwd = sha1(req.body.password)
      let avatar = req.file
      console.log(req.body)


      let temp = new User({
        name: req.body.name,
        password: pwd,
        gender: req.body.gedner,
        bio: req.body.bio,
        avatar: avatar
      })
    }
  })

  let oo = { name: '注册', msg: '注册成功'}
  res.end(JSON.stringify(oo))
})

router.get('/signout', checkLogin, (req, res, next) => {
  res.send('登出')
})

module.exports = router;