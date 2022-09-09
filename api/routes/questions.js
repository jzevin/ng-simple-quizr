var express = require('express');

const questions = require('../models/questions');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(questions);
});

module.exports = router;
