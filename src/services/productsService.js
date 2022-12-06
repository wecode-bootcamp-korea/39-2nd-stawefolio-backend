const productsDao = require('../models/productsDao');

const getProductInfo = async (productId) => {
  return await productsDao.getProductInfo(productId);
};

module.exports = { getProductInfo };
