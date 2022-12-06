const routes = require('express').Router();

const { bookingRouter } = require('./bookingListRouter');
const { authRouter } = require('./authRouter')

routes.use('/auth', authRouter);
routes.use('/booking', bookingRouter);

module.exports = { routes };
