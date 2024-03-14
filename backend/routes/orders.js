const express = require('express'),
	orderRouter = express.Router(),
	orderController = require('../controllers/order'),
	sendResponse = require('../utils/response'),
	authMiddleware = require('../middleware/auth'),
	{ HOSTNAME, PORT } = require('../config'),
	{ Order } = require('../models'),
	{ sendOrderDetails, sendTrackingId } = require('../services/email');
const genericController = require("../controllers");


const HOST = HOSTNAME === 'localhost' ? `${HOSTNAME}:${PORT}` : HOSTNAME
const PROTOCOL = HOSTNAME === 'localhost' ? 'http' : 'https';


orderRouter.get('/', async (req, res) => {
	return await genericController.getObjectByType(res, Order);
});
orderRouter.post('/create', orderController.createOrder)

orderRouter.post('/send-order-details', async (req, res) => {
	const order = await Order.findOneAndUpdate(
		{ order_id: req.body.order_id },
		{ $set: {
			approved: true,
			email: req.body.sender_email
		}},
		{ new: true }
	)

	await sendOrderDetails(
		order.language,
		order.email,
		order.products,
		order.currency,
		order.amount,
		order.shippingInfo.delivery_price
	)

	const thankYouPagePath = `${PROTOCOL}://${HOST}/thank-you-page`;
	return res.redirect(thankYouPagePath);
})


orderRouter.post('/send-tracking-id', authMiddleware, async (req, res) => {
	const requestData = {
		email: req.body.email,
		language: req.body.language,
		tracking_id: req.body.tracking_id,
		shipping_type: req.body.shipping_type,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
    }

	try {
		await sendTrackingId(requestData)
		await Order.findOneAndUpdate(
			{ order_id: req.body.order_id },
			{ $set: {trackingSent: true}},
			{ new: true }
		)
		return sendResponse(res, 200, true, {}, `Tracking id sent on: ${requestData.email}`)
	} catch (err) {
		return sendResponse(res, 500, false, {}, `Error sending tracking id: ${err}`)
	}
})

module.exports = orderRouter
