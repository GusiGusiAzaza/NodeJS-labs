const express = require('express');
const usersRouter = require('./user/user-router');
const themesRouter = require('./theme/theme-router');
const testsRouter = require('./test/test-router');
const questionsRouter = require('./question/question-router');
const answersRouter = require('./answer/answer-router');


const app = express();
app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', usersRouter);
app.use('/themes', themesRouter);
app.use('/tests', testsRouter);
app.use('/questions', questionsRouter);
app.use('/answers', answersRouter);

module.exports = app;


