const router = require('express').Router();
const status = require('http-status');
const adminController = require('./admin-controller');

router.route('/').get( async (req, res, next) => {
  const admins = await adminController.findAll();
  await res.json(admins);
  next();
});

router.route('/:id').get( async (req, res, next) => {
  const admin = await adminController.findOne(req.params.id);
  if (admin) {
    await res.json(admin);
  } else {
    res.status(status.NOT_FOUND).json(`Admin doesn't exist`);
  }
  next();
});

router.route('/').post( async (req, res, next) => {
  const admin = await adminController.create(req.body);
  await res.status(status.OK).json(admin);
  next();
});

router.route('/:id').put( async (req, res, next) => {
  const admin = await adminController.updateOne(req.params.id, req.body);
  if (admin) {
    await res.json(admin);
  } else {
    await res.status(status.NOT_FOUND).json(`Admin doesn't exist`);
  }
  next();
});

router.route('/:id').delete( async (req, res, next) => {
  const admin = await adminController.deleteOne(req.params.id);
  if (admin) {
    await res.json(admin);
  } else {
    await res.status(status.NOT_FOUND).json(`Admin doesn't exist`);
  }
  next();
});

module.exports = router;

