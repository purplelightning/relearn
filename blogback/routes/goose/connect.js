var mongoose = require("mongoose");

const config = require('config-lite')(__dirname)


//调试模式
mongoose.set('debug', true)

mongoose.connect(config.mongodb)
.then((res)=> console.log('数据库连接成功') )
.catch(err=> console.log('数据库连接失败'));