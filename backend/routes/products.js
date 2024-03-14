const express = require('express');
const productRouter = express.Router();
const genericController = require('./../controllers');
const {Product} = require("../models");

productRouter.get('/', async (req, res) => {
	return await genericController.getObjectByType(res, Product);
});

productRouter.get('/:id', async (req, res) => {
	const { id } = req.params;
	return await genericController.getObjectByTypeId(res, { params: { id } }, Product);
});

module.exports = productRouter;
