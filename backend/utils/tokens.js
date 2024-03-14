const crypto = require('crypto'),
      { SECRET_KEY } = require('../config')


function generateActivationToken(userId) {
  const hash = crypto.createHmac('sha256', SECRET_KEY);
  return hash.update(userId).digest('hex');
}

function validateActivationToken(userId, token) {
  const expectedToken = generateActivationToken(userId);
  return token === expectedToken;
}


module.exports = {
  generateActivationToken,
  validateActivationToken,
};