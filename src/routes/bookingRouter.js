const express = require('express');
const bookingRouter = express.Router();
const { tokenValidator } = require('../utils/tokenValidator');

const bookingController = require('../controllers/bookingController');
const bookingListController = require('../controllers/bookingListController');

bookingRouter.post('', tokenValidator, bookingController.postBookingData)
bookingRouter.get('/list', tokenValidator, bookingListController.getOrderStatus);

module.exports = { bookingRouter };