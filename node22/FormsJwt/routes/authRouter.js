const { Router } = require('express');
const AuthController = require('../controllers/authController');

const router = Router();

router.get('/login', AuthController.loginPage);
router.post('/login', (req, res, next) => {
    console.log(req.body);
    next();
});

router.get('/logout', AuthController.logout);
router.get('/resource', AuthController.authenticateToken, AuthController.resource);
router.get('/refresh-token', AuthController.refreshToken);
router.post('/login', AuthController.loginToken);

module.exports = router;
