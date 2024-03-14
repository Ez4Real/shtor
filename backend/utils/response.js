const sendResponse = (res, status = 200, success = true, contextData = {}, message = "") => {
    return res.status(status).json({ success, ...contextData, message });
};

module.exports = sendResponse;