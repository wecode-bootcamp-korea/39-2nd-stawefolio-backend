const routes = require('express').Router();

const { authRouter } = require('./authRouter');
const { productsRouter } = require('./productsRouter');
const { bookingRouter } = require('./bookingListRouter');

routes.use('/auth', authRouter);
routes.use('/products', productsRouter);
routes.use('/booking', bookingRouter);

module.exports = { routes };
