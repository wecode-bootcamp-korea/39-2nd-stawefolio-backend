const routes = require('express').Router();

const { authRouter } = require('./authRouter');
const { productsRouter } = require('./productsRouter');
const { bookingRouter } = require('./bookingRouter');

routes.use('/auth', authRouter);
routes.use('/products', productsRouter);
routes.use('/booking', bookingRouter);

module.exports = { routes };
