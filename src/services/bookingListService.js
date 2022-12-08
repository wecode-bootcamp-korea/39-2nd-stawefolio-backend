const bookingListDao = require('../models/bookingListDao');

const getOrderList = async(orderStatus, userId) => {
    const orderList = await bookingListDao.getBookingList(orderStatus, userId)
    console.log(orderList)
    return orderList
}

module.exports = { getOrderList }