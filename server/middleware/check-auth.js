const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    // Authorization: 'Bearer TOKEN'
    const token = req.headers.authorization.split(' ')[1];
    // check validity of token
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY); //returns payload
    req.userData = { userId: decodedToken.userId }; //adding to payload
    next();
  } catch (error) {
    return next(new HttpError('Authentication failed!', 403));
  }
};
