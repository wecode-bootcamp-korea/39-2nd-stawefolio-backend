const productsDao = require('../models/productsDao');

const getProductInfo = async (productId) => {
  return await productsDao.getProductInfo(productId);
};

const getProductList = async (
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
) => {
  return await productsDao.getProductsList(
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
};

module.exports = { getProductInfo, getProductList };
