const bookingService = require('../services/bookingService');
const { asyncWrap } = require('../utils/errorHandler');
const enums = require('../utils/enum');

const postBookingData = asyncWrap(async (req, res) => {
    const {productOptionId, numberOfUser, checkIn, checkOut, price} = req.body;
    const userId = req.userId;
    const orderStatus = enums.orderStatus.ORDERCOMPLETE

    await bookingService.postBookingData(productOptionId, numberOfUser, checkIn, checkOut, price, userId, orderStatus)
    await bookingService.updateAvailablityData(productOptionId, checkIn, checkOut)
    
    return res.status(201).json({"message" : "successfully created"})
})


module.exports = { postBookingData }