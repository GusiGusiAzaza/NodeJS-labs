const router = require('express').Router();
const status = require('http-status');
const testController = require('./test-controller');

router.route('/').get( async (req, res, next) => {
  const tests = await testController.findAll();
  await res.json(tests);
  next();
});

router.route('/:id').get( async (req, res, next) => {
  const test = await testController.findOne(req.params.id);
  if (test) {
    await res.json(test);
  } else {
    res.status(status.NOT_FOUND).json(`User with this name doesn't exist`);
  }
  next();
});

router.route('/').post( async (req, res, next) => {
  const test = await testController.create(req.body);
  await res.status(status.OK).json(test);
  next();
});

router.route('/:id').put( async (req, res, next) => {
  const test = await testController.updateOne(req.params.id, req.body);
  if (test) {
    await res.json(test);
  } else {
    await res.status(status.NOT_FOUND).json(`User with this name doesn't exist`);
  }
  next();
});

router.route('/:id').delete( async (req, res, next) => {
  const test = await testController.deleteOne(req.params.id);
  if (test) {
    await res.json(test);
  } else {
    await res.status(status.NOT_FOUND).json(`User with this name doesn't exist`);
  }
  next();
});

module.exports = router;

