var express = require('express');

var questions = require('../models/questions');
var router = express.Router();

// const questionsWithIds = questions.map((question, index) => ({...question, id: question.id+ Math.random().toString(36).substring(2, 11)}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(req.query.delay) {
    setTimeout(() => {
      res.json(questions);
    }, req.query.delay);
  } else {
    res.json(questions);
  }
});

module.exports = router;
