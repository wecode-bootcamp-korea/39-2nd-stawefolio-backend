const productsRouter = require('express').Router();
const productsController = require('../controllers/productsController');

productsRouter.get('/:productId', productsController.getProductInfo);
productsRouter.get('', productsController.getProductList);

module.exports = { productsRouter };
