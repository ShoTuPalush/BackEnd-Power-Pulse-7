const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const { v4 } = require('uuid');
const { URL } = require('url');
const cloudinary = require('cloudinary').v2;
const querystring = require('node:querystring');
const Users = require('../models/users');
const Tokens = require('../models/tokens');
const controllerWrapper = require('../helpers/controllerWrapper');
const HttpError = require('../helpers/HttpError');
const calculateBMR = require('../helpers/calculateBMR');
const { updateTokens } = require('../helpers/updateToken');
const sendEmail = require('../helpers/sendEmail');
const generateVerifyMessage = require('../helpers/generateVerifyMessage');

dotenv.config();
const { JWT_SECRET, FRONTEND_URL, BACKEND_URL, CLIENT_ID, CLIENT_SECRET } =
  process.env;
const frontURL = FRONTEND_URL || 'http://localhost:3000';
const backURL = BACKEND_URL || 'http://localhost:3000';

cloudinary.config({
  cloud_name: 'dxqzi4x9j',
  api_key: 417617877398435,
  api_secret: 'fYS2XkZOZeQb3Ra7a3eS91zkHQ4',
});

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  const verificationToken = v4();

  try {
    const result = await Users.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });
    sendEmail({
      to: email,
      subject: 'Please confirm your email',
      html: generateVerifyMessage(verificationToken),
    });
    res.status(201).json({ email: result.email, name: result.name });
  } catch (error) {
    if (error.code === 11000) {
      throw HttpError(409, 'Email in use!');
    }
    throw error;
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const tokens = await updateTokens(user._id);
  await Users.findByIdAndUpdate(user._id, { token: tokens.accessToken });
  const user1 = await Users.findOne(
    { email },
    { password: 0, createdAt: 0, updatedAt: 0, token: 0, verificationToken: 0 }
  );
  res.status(200).json({
    tokens,
    users: user1,
  });
};

const logOutUser = async (req, res) => {
  const { user } = req;
  if (user) {
    await Users.findByIdAndUpdate(user._id, { token: '' });
    res.status(204).json({ message: 'logout was successfull' });
  } else {
    throw HttpError(401, 'Not authorized');
  }
};

const currentUser = async (req, res) => {
  const { user } = req;
  if (user) {
    const user1 = await Users.findById(user._id, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      token: 0,
      verificationToken: 0,
    });
    res.status(200).json(user1);
  } else {
    throw HttpError(401, 'Not authorized');
  }
};

const updateUser = async (req, res) => {
  const { user } = req;
  const body = req.body;
  console.log(user);
  if (user) {
    const user1 = await Users.findByIdAndUpdate(user._id, body, { new: true });
    const { height, currentWeight, birthday, sex, levelActivity } = user1;
    const bmr = calculateBMR({
      currentWeight,
      height,
      birthday,
      levelActivity,
      sex,
    });
    const user2 = await Users.findByIdAndUpdate(
      user._id,
      { bmr },
      { new: true }
    );
    const user3 = await Users.findById(user2._id, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
      token: 0,
      verificationToken: 0,
    });
    res.json(user3);
  } else {
    throw HttpError(401, 'Not authorized');
  }
};

const updateAvatar = async (req, res) => {
  const { user } = req;
  if (user) {
    const user1 = await Users.findByIdAndUpdate(
      user._id,
      { avatarUrl: req.file.path },
      { new: true }
    );
    res.status(200).json({ avatarUrl: user1.avatarUrl });
  } else {
    throw HttpError(401, 'Not authorized');
  }
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, JWT_SECRET);
    if (payload.type !== 'refresh') {
      return res.status(400).json({ message: 'Invalid Token' });
    }
  } catch (error) {
    if (
      error.name === 'TokenExpiredError' ||
      error.name === 'JsonWebTokenError'
    ) {
      throw HttpError(401, 'Not authorized');
    }
  }
  const token = await Tokens.findOne({ tokenId: payload.id });
  const newTokens = await updateTokens(token.userId);
  res.json(newTokens);
};

const verifyUser = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await Users.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  await Users.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });
  res.status(200).json({ message: 'Verification successful' });
};

const verifyUserTwo = async (req, res) => {
  const { email } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }
  sendEmail({
    to: email,
    subject: 'Please confirm your email',
    html: generateVerifyMessage(user.verificationToken),
  });
  res.status(200).json({ message: 'Verification email sent' });
};

const googleauth = async (req, res) => {
  const stringifiedParams = querystring.stringify({
    client_id: CLIENT_ID,
    redirect_uri: `${backURL}/api/users/googleredirect`,
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' '),
    response_type: 'code',
    access_type: 'offline',
    prompt: 'consent',
  });
  console.log(`${backURL}/api/users/googleredirect`);
  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

const googleredirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = querystring.parse(urlObj.search);
  const code = urlParams[Object.keys(urlParams)[0]];
  const tokenData = await axios({
    url: 'https://oauth2.googleapis.com/token',
    method: 'post',
    data: {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: `${backURL}/api/users/googleredirect`,
      grant_type: 'authorization_code',
      code,
    },
  });
  const userData = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: {
      Authorization: `Bearer ${tokenData.data.access_token}`,
    },
  });

  const user = await Users.findOne({ email: userData.data.email });
  if (!user) {
    const verificationToken = v4();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.data.id, salt);
    await Users.create({
      name: userData.data.name,
      email: userData.data.email,
      password: hashedPassword,
      verificationToken,
      verify: true,
    });
  }
  const user1 = await Users.findOne({ email: userData.data.email });
  const tokens = await updateTokens(user1._id);
  await Users.findByIdAndUpdate(user1._id, { token: tokens.accessToken });
  res.redirect(
    `${frontURL}/?accesstoken=${tokens.accessToken}&refreshtoken=${tokens.refreshToken}`
  );

  res.redirect(`${frontURL}/`);
};

module.exports = {
  registerUser: controllerWrapper(registerUser),
  loginUser: controllerWrapper(loginUser),
  logOutUser: controllerWrapper(logOutUser),
  currentUser: controllerWrapper(currentUser),
  updateUser: controllerWrapper(updateUser),
  updateAvatar: controllerWrapper(updateAvatar),
  refreshToken: controllerWrapper(refreshToken),
  verifyUser: controllerWrapper(verifyUser),
  verifyUserTwo: controllerWrapper(verifyUserTwo),
  googleauth: controllerWrapper(googleauth),
  googleredirect: controllerWrapper(googleredirect),
};
