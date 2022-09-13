var express = require('express');

var questions = require('../models/questions');
var router = express.Router();

// const questionsWithIds = questions.map((question, index) => ({...question, id: question.id+ Math.random().toString(36).substring(2, 11)}));

// const newQuestions = questions.reduce((acc, question) => {
//   acc[question.id] = question;
//   return acc;
// }, {});

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(questions);
});

module.exports = router;
