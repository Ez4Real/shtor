const sendResponse = require('./../utils/response');

const getObjectByType = async (res, objectModel) => {
	try {
		const objects = await objectModel.find();
		return sendResponse(res, 200, true, { data: objects }, '');
	} catch (error) {
		return sendResponse(res, 500, false, {}, 'Internal Server Error');
	}
};

const getObjectByTypeId = async (res, req, objectModel) => {
	try {
		const object = await objectModel.findById(req.params.id);
		if (!object) {
			return sendResponse(res, 404, false, {}, 'Object not found');
		}
		return sendResponse(res, 200, true, { data: object }, '');
	} catch (error) {
		return sendResponse(res, 500, false, {}, 'Internal Server Error');
	}
};

module.exports = {
	getObjectByType,
	getObjectByTypeId,
};
