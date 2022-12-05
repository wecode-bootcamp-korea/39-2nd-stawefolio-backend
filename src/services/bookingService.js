const bookingDao = require('../models/bookingDao');
const { v4: uuidv4 } = require('uuid');

const postBookingData = async (productOptionId, numberOfUser, checkIn, checkOut, price, userId, orderStatus) => {
    const orderNumber = uuidv4()
    const bookingData = await bookingDao.postBooking(orderNumber, productOptionId, numberOfUser, checkIn, checkOut, price, userId, orderStatus)
    return bookingData
}

const updateAvailablityData = async (productOptionId, checkIn, checkOut) => {

    const availableDateCal = (checkIn, checkOut) => {
        let result = [];
        let curDate = new Date(checkIn);
        while(curDate < new Date(checkOut)) {
            result.push(curDate.toISOString().split("T")[0]);
            curDate.setDate(curDate.getDate() + 1);
        }
        return result;
    }

    const availableDate = availableDateCal(checkIn, checkOut)

    const availabilityData = await bookingDao.updateAvailablity(productOptionId, availableDate)
    return availabilityData
}

module.exports = { postBookingData, updateAvailablityData }