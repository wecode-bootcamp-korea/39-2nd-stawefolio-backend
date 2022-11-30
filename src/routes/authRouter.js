const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.get('', authController.auth);

module.exports = { authRouter };
