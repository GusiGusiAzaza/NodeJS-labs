const router = require('express').Router();
const status = require('http-status');
const answerController = require('./answer-controller');

router.route('/').get( async (req, res, next) => {
  const users = await answerController.findAll();
  await res.json(users);
  next();
});

router.route('/:id').get( async (req, res, next) => {
  const answer = await answerController.findOne(req.params.id);
  if (answer) {
    await res.json(answer);
  } else {
    res.status(status.NOT_FOUND).json(`Answer doesn't exist`);
  }
  next();
});

router.route('/').post( async (req, res, next) => {
  const answer = await answerController.create(req.body);
  await res.status(status.OK).json(answer);
  next();
});

router.route('/:id').put( async (req, res, next) => {
  const answer = await answerController.updateOne(req.params.id, req.body);
  if (answer) {
    await res.json(answer);
  } else {
    await res.status(status.NOT_FOUND).json(`Answer doesn't exist`);
  }
  next();
});

router.route('/:id').delete( async (req, res, next) => {
  const answer = await answerController.deleteOne(req.params.id);
  if (answer) {
    await res.json(answer);
  } else {
    await res.status(status.NOT_FOUND).json(`Answer with this name doesn't exist`);
  }
  next();
});

module.exports = router;

