var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')(__dirname)
const pkg = require('./package')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/goose/user');
var postRouter = require('./routes/goose/posts');
var commentRouter = require('./routes/goose/comments');

var app = express();

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new MongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}))

// 允许前端跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8855");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next()
})

//验证用户登录   这个要写在允许跨域后面，否则中断后会导致跨域问题
app.use(function(req, res, next){
  //后台请求
  if(req.session.username){ //表示已经登录后台
    next()
  }else if(req.url.indexOf("login") >=0 || req.url.indexOf("logout") >= 0 || req.url.indexOf("register") >= 0){
    //登入，登出不需要登录
    next();
  }else{
    //next(); //TODO:这里是调试的时候打开的，以后需要删掉
    res.end('{"redirect":"true"}');
  }
})

// flash 中间件，用来显示通知
// app.use(flash())

// 处理表单及文件上传的中间件
// app.use(require('express-formidable')({
//   uploadDir: path.join(__dirname, 'public/img'), // 上传文件目录
//   keepExtensions: true// 保留后缀
// }))



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 路由
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/posts', postRouter)
app.use('/comment', commentRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 监听端口，启动程序
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on port ${config.port}`)
})

module.exports = app;
