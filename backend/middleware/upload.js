const multer = require("multer"),
      sendResponse = require('../utils/response')

const whitelist = [
	'image/png',
	'image/jpeg',
	'image/jpg',
]


const uploadMiddleware = multer({
  storage: multer.diskStorage({
    destination: '../productPhotos/',
    filename: (req, file, cb) => {
		  cb(null, file.originalname)
    },
  }),
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(new Error('All files should be an image with png/jpeg/jpg format'), false)
    }
    cb(null, true);
  },
})

const errorHandler = (err, req, res, next) => {
  if (err) {
    return sendResponse(res, 400, false, {}, `Error uploading an image - ${err.message}`)
  }
}




module.exports = {
  uploadMiddleware,
  errorHandler
}
