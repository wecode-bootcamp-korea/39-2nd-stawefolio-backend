const { asyncWrap } = require('../utils/errorHandler');
const productsService = require('../services/productsService');

const getProductInfo = asyncWrap(async (req, res) => {
  const { productId } = req.params;

  const productInfo = await productsService.getProductInfo(productId);

  return await res.status(200).json({ data: productInfo });
});

const getProductList = asyncWrap(async (req, res) => {
  const {
    keyword,
    checkInDate,
    checkOutDate,
    region,
    numberOfGuests,
    priceMin,
    priceMax,
    theme,
    type,
    orderBy,
  } = req.query;

  const productsList = await productsService.getProductList(
    keyword,
    checkInDate,
    checkOutDate,
    region,
    numberOfGuests,
    priceMin,
    priceMax,
    theme,
    type,
    orderBy
  );

  if (
    (!checkInDate && checkOutDate) ||
    (checkInDate && !checkOutDate) ||
    (!priceMin && priceMax) ||
    (priceMin && !priceMax)
  ) {
    return res.status(200).json({
      data: [],
      message: 'Incomplete request data',
    });
  }

  if (productsList.length === 0) {
    return res.status(200).json({
      data: productsList,
      message: 'The requested information not found',
    });
  }

  return await res.status(200).json({ data: productsList });
});

module.exports = { getProductList, getProductInfo };
