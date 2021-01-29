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
    type: String, required: true
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

const fs = require('fs')
const path = require('path')
const sha1 =require('sha1')
var multer =require('multer')
var avatarUpload = multer({dest: 'public/avatar/'})


const errReturn = JSON.stringify({
  err: '请求失败'
})


router.get('/info', function (req, res, next) {
  let obj = {
    data: 'info'
  }
  res.end(JSON.stringify(obj));
});


router.post('/register', (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  User.find({name: req.body.name}, (err, docs)=>{
    if(err){
      res.end(errReturn)
    }
    if(docs.length){
      res.end('{"err":"该用户名已注册"}')
    }else{
      let pwd = sha1(req.body.password)
      let temp = new User({
        name: req.body.name,
        password: pwd,
        gender: req.body.gender,
        bio: req.body.bio,
        avatar: 'tree.jpg' //默认头像
      })
      temp.save((err, doc) =>{
        if(err){
          console.log(err)
          res.end(errReturn)
        }
        let str = '用户' + req.body.name + '注册成功';
        let oo = {
          msg: str,
          code: 200
        }
        res.end(JSON.stringify(oo))
      })

    }
  })
})

router.post('/login', (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  if(!req.body.name || !req.body.password){
    res.end('{"err":"请输入用户名和密码"}')
  }
  User.find({name: req.body.name}, (err,docs)=>{
    if(err){
      console.log(err)
    }else{
      if(!docs.length){
        res.end('{"err":"该用户名未注册"}')
      }else if(docs[0].password !== sha1(req.body.password)){
        res.end('{"err":"密码错误"}')
      }else{
        req.session.username = req.body.name
        req.session.password = sha1(req.body.password)
        let obj = {
          msg: '登录成功',
          code: 200,
          userName: req.body.name
        }
        res.end(JSON.stringify(obj))
      }
    }
  })
})

router.get('/avatar', (req, res, next) => {
  User.find({name: req.session.username}, (err,docs) => {
    if(err){
      console.log(err)
    }else{
      let doc = docs[0]
      console.log(doc)
      let obj ={
        logoUrl: '/avatar/' + doc.avatar
      }
      res.end(JSON.stringify(obj))
    }
  })
})

router.post('/uploadAvatar', avatarUpload.single('avatar'), (req, res, next) => {
  res.writeHead(200,{
    'Content-Type': 'text/html; charset=utf-8'
  })
  if(!req.file.path){
    res.end("{'err':'头像修改失败'}")
  }
  console.log(req.file.path)
  let arr = req.file.path.split('\\')
  let newImg = arr[arr.length-1]
  console.log(newImg)
  User.findOneAndUpdate({name: req.session.username},{"$set": {avatar: newImg}}, {"new":true}, (err,data) =>{
        if(err){
          res.end("{'err':'头像修改失败'}")
        }else{
          let obj = {
            code: 200,
            msg: '头像修改成功',
            success: true
          }
          res.end(JSON.stringify(obj))
        }
    }
  )
})

router.get('/logout', (req, res, next) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  req.session.username = ''
  req.session.password = ''
  res.end('{"msg":"退出登录成功~", "code": 200}')
})

module.exports = router;