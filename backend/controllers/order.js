const { Order } = require("../models"),
	  sendResponse = require('./../utils/response')

const createOrder = async (req, res) => {
	try {
		const savedOrder = await Order.create(req.body);
		return sendResponse(res, 200, true, { savedOrder }, 'Order precreated successfully');
	} catch (error) {
		console.error('Error creating product:', error);
		return sendResponse(res, 500, false, {}, `Internal Server Error - ${error}`); 
	}
};

module.exports = {
	createOrder,
};
