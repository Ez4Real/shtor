const express = require('express');
const adminRouter = express.Router();
const sendResponse = require('./../utils/response');
const { uploadMiddleware, errorHandler } = require("../middleware/upload");
const productController = require("../controllers/product");
const imageController = require("../controllers/image");

adminRouter.get('/', (req, res) =>
	sendResponse(res, 200, true, {email: req.user.email}, ""))

adminRouter.post('/product', productController.createProduct);

adminRouter.post('/product/:id', productController.updateProductById);

adminRouter.put('/product/updateOrder', productController.updateProductsOrder);

adminRouter.put('/product/:id', productController.updateProductKeyById);

adminRouter.post('/product/:id/copy', productController.copyProductById);

adminRouter.delete('/product/:id', productController.deleteProductById);


adminRouter.post('/upload/image', uploadMiddleware.single('image'), imageController.createProductImage);
adminRouter.post('/edit/image', uploadMiddleware.single('image'), imageController.editProductImage);
adminRouter.post('/delete/image', imageController.deleteProductImage);

module.exports = adminRouter;

