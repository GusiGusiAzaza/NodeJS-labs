const router = require('express').Router();
const status = require('http-status');
const themeController = require('./theme-controller');

router.route('/').get( async (req, res, next) => {
  const themes = await themeController.findAll();
  await res.json(themes);
  next();
});

router.route('/:id').get( async (req, res, next) => {
  const theme = await themeController.findOne(req.params.id);
  if (theme) {
    await res.json(theme);
  } else {
    res.status(status.NOT_FOUND).json(`Theme doesn't exist`);
  }
  next();
});

router.route('/').post( async (req, res, next) => {
  const theme = await themeController.create(req.body);
  await res.status(status.OK).json(theme);
  next();
});

router.route('/:id').put( async (req, res, next) => {
  const theme = await themeController.updateOne(req.params.id, req.body);
  if (theme) {
    await res.json(theme);
  } else {
    await res.status(status.NOT_FOUND).json(`Theme doesn't exist`);
  }
  next();
});

router.route('/:id').delete( async (req, res, next) => {
  const theme = await themeController.deleteOne(req.params.id);
  if (theme) {
    await res.json(theme);
  } else {
    await res.status(status.NOT_FOUND).json(`Theme doesn't exist`);
  }
  next();
});

module.exports = router;

