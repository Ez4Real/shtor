const { Schema, model } = require('mongoose');

const productSchema = new Schema({
	group: {type: String, required: true},
	inStock: {type: Boolean, default: false, required: true},
	name: {
		en: { type: String },
		ua: { type: String }
	},
	description: {
		en: { type: String },
		ua: { type: String }
	},
	price: {
		en: { type: Number, min: 0 },
		ua: { type: Number, min: 0 },
	},
	color: [{type: String}],
	size: [{type: String}],
	seashells: [[{type: String}]],
	images: [{type: String}],
	feature: {type: String},
	orderIndex: {type: Number, required: true, unique: true},
	isVisible: {type: Boolean, default: false, required: true},
	copiedFromId: {type: String},
	variations: [{
		name: {
			en: { type: String },
			ua: { type: String }
		},
		description: {
			en: { type: String },
			ua: { type: String }
		},
		price: {
			en: { type: Number, min: 0 },
			ua: { type: Number, min: 0 },
		},
		color: {type: String},
		material: {type: String},
		size: [{type: String}],
		images: [{type: String}],
		attachment: {type: String},
	}]
});

const Product = model('Product', productSchema);

module.exports = Product;

