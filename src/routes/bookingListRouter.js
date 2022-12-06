const express = require('express');
const bookingRouter = express.Router();
const { tokenValidator } = require('../utils/tokenValidator');

const bookingController = require('../controllers/bookingListController');

bookingRouter.get('/list', tokenValidator, bookingController.getOrderStatus);

module.exports = { bookingRouter };