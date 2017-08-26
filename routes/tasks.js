var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/tasks', function(req, res, next) {
  res.send('TASK API');
});

module.exports = router;
