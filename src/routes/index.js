const routes = require('express').Router();
const { authRouter } = require('./authRouter');

routes.use('/auth', authRouter);

module.exports = { routes };
