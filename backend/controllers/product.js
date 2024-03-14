const { Product } = require("../models");
const genericController = require("../controllers");
const sendResponse = require('./../utils/response');

const createProduct = async (req, res) => {
	try {
		const savedProduct = await Product.create(req.body);
		return genericController.getObjectByType(res, savedProduct.constructor, savedProduct._id);
	} catch (error) {
		console.error('Error creating product:', error);
		return sendResponse(res, 500, false, {}, 'Internal Server Error');
	}
};

const updateProductById = async (req, res) => {
	const { id } = req.params;

	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			req.body,
			{ new: true, runValidators: true }
		);

		if (!updatedProduct) {
			return sendResponse(res, 404, false, {}, 'Product not found');
		}

		return sendResponse(res, 200, true, { data: updatedProduct }, 'Product updated successfully');
	} catch (error) {
		console.error(error);
		return sendResponse(res, 500, false, {}, 'Internal Server Error');
	}
};

const updateProductKeyById = async (req, res) => {
	const { id } = req.params;
	const updateData = req.body;

	try {
		const product = await Product.findById(id);

		if (!product) {
			return sendResponse(res, 404, false, {}, 'Product not found');
		}

		for (const key in updateData) {
			if (Object.prototype.hasOwnProperty.call(updateData, key)) {
				product[key] = updateData[key];
			}
		}

		const updatedProduct = await product.save();

		return sendResponse(res, 200, true, { data: updatedProduct }, 'Product updated successfully');
	} catch (error) {
		console.error(error);
		return sendResponse(res, 500, false, {}, 'Internal Server Error');
	}
};

const copyProductById = async (req, res) => {
	try {
		const productId = req.params.id;
		// Fetch the product by ID from the database
		const productToCopy = await Product.findById(productId);
		if (!productToCopy) {
			return sendResponse(res, 404, false, null, "Product not found.");
		}

		const {_id, inStock, isVisible, ...newProduct} = productToCopy.toObject()

		// Find the maximum orderIndex value
		const maxOrderIndexProduct = await Product.findOne().sort({orderIndex: -1});
		let orderIndex = 1; // Default value if no products exist
		if (maxOrderIndexProduct) {
			orderIndex = maxOrderIndexProduct.orderIndex + 1;
		}

		// Create a copy of the product with the new orderIndex
		const copiedProduct = new Product({
			...newProduct,
			copiedFromId: _id,
			orderIndex: orderIndex
		});

		// Save the copied product to the database
		await copiedProduct.save();

		// Respond with the copied product details
		return sendResponse(res, 200, true, {data: copiedProduct}, "Product copied successfully.");
	} catch (error) {
		// Handle errors
		console.error("Error copying product:", error);
		return sendResponse(res, 500, false, null, "Internal server error.");
	}
};

const deleteProductById = async (req, res) => {
	try {
		const productId = req.params.id;
		// Find the product by ID and remove it from the database
		const deletedProduct = await Product.findByIdAndDelete(productId);
		if (!deletedProduct) {
			return sendResponse(res, 404, false, null, "Product not found.");
		}

		// Find all products with orderIndex greater than the deleted product's orderIndex
		const productsToUpdate = await Product.find({ orderIndex: { $gt: deletedProduct.orderIndex } });
		// Update the orderIndex of each subsequent product
		for (const product of productsToUpdate) {
			product.orderIndex -= 1;
			await product.save();
		}

		// Respond with a success message
		return sendResponse(res, 200, true, null, "Product deleted successfully.");
	} catch (error) {
		// Handle errors
		console.error("Error deleting product:", error);
		return sendResponse(res, 500, false, null, "Internal server error.");
	}
};


const updateProductsOrder = async (req, res) => {
	const productIds = req.body;

	try {
		await Product.collection.dropIndex("orderIndex_1");
		for (let i = 0; i < productIds.length; i++) {
			const productId = productIds[i];
			await Product.findByIdAndUpdate(productId, { orderIndex: i });
		}

		await Product.collection.createIndex({ orderIndex: 1 }, { unique: true });

		return sendResponse(res, 200, true, null, "Product order updated successfully");
	} catch (error) {
		console.error("Error updating product order:", error);
		return sendResponse(res, 500, false, null, "Failed to update product order");
	}
};

module.exports = {
	createProduct,
	updateProductById,
	updateProductKeyById,
	copyProductById,
	deleteProductById,
	updateProductsOrder,
};
