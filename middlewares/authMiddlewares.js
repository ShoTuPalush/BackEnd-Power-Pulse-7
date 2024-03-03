const Users = require('../models/users');
const HttpError = require('../helpers/HttpError');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { JWT_SECRET } = process.env;

const authMiddlewares = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const [type, token] = authHeader.split(' ');
  if (type !== 'Bearer') {
    next(HttpError(401, 'Not authorized'));
  }
  if (!token) {
    next(HttpError(401, 'Not authorized'));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    if (payload.type !== 'access') {
      next(HttpError(401, 'Not authorized'));
    }

    const user = await Users.findById(payload.userId);
    if (user) {
      if (user.token === token) {
        req.user = user;
      } else {
        next(HttpError(401, 'Not authorized'));
      }
    }
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      next(HttpError(401, 'Token expired'));
    }
    next(error);
  }
  next();
};

module.exports = authMiddlewares;
