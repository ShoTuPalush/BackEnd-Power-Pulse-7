const { v4 } = require('uuid');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Tokens = require('../models/tokens.js');
const Users = require('../models/users.js');

dotenv.config();
const { JWT_SECRET } = process.env;

const generateAccessToken = userId => {
  const payload = { userId, type: 'access' };
  const options = { expiresIn: '23h' };
  return jwt.sign(payload, JWT_SECRET, options);
};

const generateRefreshToken = () => {
  const payload = { id: v4(), type: 'refresh' };
  const options = { expiresIn: '7d' };
  return { id: payload.id, token: jwt.sign(payload, JWT_SECRET, options) };
};

const replaceDbRefreshToken = async (tokenId, userId) => {
  await Tokens.findOneAndDelete({ userId });
  const result = await Tokens.create({ tokenId, userId });
  return result;
};

const updateTokens = async userId => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken();

  await replaceDbRefreshToken(refreshToken.id, userId);
  await Users.findByIdAndUpdate(userId, { token: accessToken });
  return { accessToken, refreshToken: refreshToken.token };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
  updateTokens,
};
