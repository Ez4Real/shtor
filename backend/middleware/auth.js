const jwt = require("jsonwebtoken"),
      sendResponse = require('./../utils/response')

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return sendResponse(res, 400, false, {}, "A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return sendResponse(res, 401, false, {}, "Invalid Token");
  }
};

module.exports = verifyToken;
