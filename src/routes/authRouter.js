const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.get('/login/kakao', authController.auth);

module.exports = { authRouter };
