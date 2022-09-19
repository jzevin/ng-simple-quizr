var express = require('express');

var questions = require('../models/questions');
var router = express.Router();

// const questionsWithIds = questions.map((question, index) => ({...question, id: question.id+ Math.random().toString(36).substring(2, 11)}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  setTimeout(() => {
    res.json(questions);
  }, 2000);
});

module.exports = router;
