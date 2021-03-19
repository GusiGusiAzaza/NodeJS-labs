const router = require('express').Router();
const status = require('http-status');
const questionController = require('./question-controller');

router.route('/').get( async (req, res, next) => {
  const questions = await questionController.findAll();
  await res.json(questions);
  next();
});

router.route('/:id').get( async (req, res, next) => {
  const question = await questionController.findOne(req.params.id);
  if (question) {
    await res.json(question);
  } else {
    res.status(status.NOT_FOUND).json(`User with this name doesn't exist`);
  }
  next();
});

router.route('/').post( async (req, res, next) => {
  const question = await questionController.create(req.body);
  await res.status(status.OK).json(question);
  next();
});

router.route('/:id').put( async (req, res, next) => {
  const question = await questionController.updateOne(req.params.id, req.body);
  if (question) {
    await res.json(question);
  } else {
    await res.status(status.NOT_FOUND).json(`User with this name doesn't exist`);
  }
  next();
});

router.route('/:id').delete( async (req, res, next) => {
  const question = await questionController.deleteOne(req.params.id);
  if (question) {
    await res.json(question);
  } else {
    await res.status(status.NOT_FOUND).json(`User with this name doesn't exist`);
  }
  next();
});

module.exports = router;

