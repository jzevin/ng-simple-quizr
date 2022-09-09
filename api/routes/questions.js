var express = require('express');

var questions = require('../models/questions');
var router = express.Router();

const questionsWithIds = questions.map((question, index) => ({...question, id: index}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(questionsWithIds);
});

module.exports = router;
