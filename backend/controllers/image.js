const sendResponse = require('./../utils/response'),
    { Product } = require("../models"),
    { deleteImage } = require('../utils/storage');


const createProductImage = async (req, res) => {
    try {
        const file = req.file;
        return sendResponse(res, 200, true, { }, `Image ${file.filename} uploaded successfully`);
    } catch (error) {
        return sendResponse(res, 500, false, {}, 'Error uploading an image');
    }
};

const editProductImage = async (req, res) => {
    try {
        if (req.fileValidationError) {
            return res.status(400).json({success: false, message: req.fileValidationError});
        }

        const {imageName, imageToDelete} = req.body; // Assuming imageToDelete is sent in the request body
        const file = req.file;

        if (!file) {
            return res.status(400).json({success: false, message: 'Image file not found'});
        }

        // Delete the old image if imageToDelete is provided
        if (imageToDelete) {
            deleteImage(imageToDelete);
        }

        // Here you can process the new image file (file.filename) as needed

        return res.status(200).json({
            success: true,
            message: `Image changed to ${file.filename} successfully`
        });
    } catch (error) {
        console.error('Error editing an image:', error);
        return res.status(500).json({success: false, message: 'Error changing an image'});
    }
}

const deleteProductImage = async (req, res) => {
    try {
        const { imageName } = req.body;
        console.log('req.body', req.body)
        // Verify if imageName exists
        if (!imageName) {
            return sendResponse(res, 400, false, {}, 'Image name is missing in the request');
        }

        // Perform the image deletion
        deleteImage(imageName);

        return sendResponse(res, 200, true, {}, `Image ${imageName} deleted successfully`);
    } catch (error) {
        console.error('Error deleting image:', error);
        return sendResponse(res, 500, false, {}, 'Error deleting an image');
    }
};



module.exports = {
	  createProductImage,
    editProductImage,
    deleteProductImage,
}
