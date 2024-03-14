const path = require("path");
const fs = require("fs");

const imageDirectory = path.join(__dirname, '../../productPhotos/');


const checkFileExists = (req, res, next) => {
	const filePath = path.join(imageDirectory, req.url);

	fs.access(filePath, fs.constants.F_OK, (err) => {
		if (err) {
			res.status(404).send(`File ${req.url} not found`);
		} else {
			next();
		}
	});
};

const isFileExists = (filePath) => {
	return new Promise((resolve, reject) => {
		fs.stat(filePath, (err, stats) => {
			if (err) {
				if (err.code === 'ENOENT') {
					// File does not exist
					resolve(false);
				} else {
					// Other error occurred
					reject(err);
				}
			} else {
				// File exists
				resolve(true);
			}
		});
	});
};

const deleteImage = async (filename) => {
	console.log('filename, imageDirectory', filename, imageDirectory)
	const filePath = path.join(imageDirectory, filename);
	const isTrue = await isFileExists(filePath)
	console.log(isTrue)
	if (isTrue) {
		fs.unlink(path.join(imageDirectory, filename), (err) => {
			if (err) {
				throw new Error(`Error deleting image ${filename}:`, err)
			}
		});
	}
};


module.exports = {
	checkFileExists,
	deleteImage
};
