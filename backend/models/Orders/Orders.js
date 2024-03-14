const {Schema, model} = require('mongoose');

const baseAddressFields = (required) => ({
	countryRegion: {type: String, required},
	firstName: {type: String, required},
	lastName: {type: String, required},
	address: {type: String, required},
	additional: {type: String},
	postalCode: {type: String, required},
	city: {type: String, required},
	phone: {type: String, required},
})

const orderSchema = new Schema({
	currency: {type: String, enum: ['UAH', 'USD', 'EUR'], required: true},
	amount: {type: Number, min: 0, required: true},
	orderDescription: {type: String, required: true},
	language: {type: String, enum: ['en', 'uk'], required: true},
	email: {type: String},
	order_id: {type: String, required: true},
	approved: {type: Boolean, required: true, default: false},
	trackingSent: {type: Boolean, default: false},
	products: [{
		group: {type: String, required: true,},
		name: {
			en: {type: String},
			ua: {type: String}
		},
		description: {
			en: {type: String},
			ua: {type: String}
		},
		price: {
			en: {type: Number, min: 0},
			ua: {type: Number, min: 0},
		},
		color: [{type: String}],
		size: [{type: String}],
		image: {type: String},
		attachment: {type: String},
		material: {type: String},
		quantity: {type: Number, required: true, min: 1},
	}],
	shippingInfo: {
		type: {type: String, enum: ['Ukraine', 'International'], required: true},
		delivery_price: {type: Number, min: 0, required: true},
		...baseAddressFields(true),
	},
	billingAddress: {
		...baseAddressFields(false),
	},
	createdAt: {type: Date, default: Date.now}
});

const Order = model('Order', orderSchema);

module.exports = Order
