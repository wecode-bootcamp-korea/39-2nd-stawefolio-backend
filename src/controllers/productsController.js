const { asyncWrap } = require('../utils/errorHandler');
const productsService = require('../services/productsService');

const getProductInfo = asyncWrap(async (req, res) => {
  const { productId } = req.params;

  const productInfo = await productsService.getProductInfo(productId);

  return await res.status(200).json({ data: productInfo });
});

module.exports = { getProductInfo };
