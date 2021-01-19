var express = require('express');
var router = express.Router();
require('./goose/connect.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
