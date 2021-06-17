const { Router } = require('express');
const MainController = require('../controllers/mainController');

const router = Router();

router.get('/', MainController.getIndex);

module.exports = router;
