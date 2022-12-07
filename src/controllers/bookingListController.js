const bookingListService = require('../services/bookingListService');
const { asyncWrap } = require('../utils/errorHandler')
const getOrderStatus = asyncWrap(async (req, res) => {
    const { orderStatus } = req.query;
    const userId = req.userId;
    
    const [result] = await bookingListService.getOrderList(orderStatus, userId)
    return res.status(200).json(result)
})

module.exports = { getOrderStatus }