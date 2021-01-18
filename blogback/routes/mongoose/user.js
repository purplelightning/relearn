var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/info', function(req, res, next) {
  let obj = {data: 'info'}
  res.end(JSON.stringify(obj));
});

module.exports = router;
