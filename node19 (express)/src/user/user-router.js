const router = require('express').Router();
const status = require('http-status');
const userController = require('./user-controller');

router.route('/').get( async (req, res, next) => {
  const users = await userController.findAll();
  await res.json(users);
  next();
});

router.route('/:username').get( async (req, res, next) => {
  const user = await userController.findOne(req.params.username);
  if (user) {
    await res.json(user);
  } else {
    res.status(status.NOT_FOUND).json(`User with this name doesn't exist`);
  }
  next();
});

router.route('/').post( async (req, res, next) => {
  const user = await userController.create(req.body);
  await res.status(status.OK).json(user);
  next();
});

router.route('/:username').put( async (req, res, next) => {
  const user = await userController.updateOne(req.params.username, req.body);
  if (user) {
    await res.json(user);
  } else {
    await res.status(status.NOT_FOUND).json(`User with this name doesn't exist`);
  }
  next();
});

router.route('/:username').delete( async (req, res, next) => {
  const user = await userController.deleteOne(req.params.username);
  if (user) {
    await res.json(user);
  } else {
    await res.status(status.NOT_FOUND).json(`User with this name doesn't exist`);
  }
  next();
});

module.exports = router;

