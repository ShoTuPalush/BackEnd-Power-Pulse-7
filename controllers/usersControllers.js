const controllerWrapper = require('../helpers/controllerWrapper');
const bcrypt = require('bcrypt');
const Users = require('../models/users');
const HttpError = require('../helpers/HttpError');
const calculateBMR = require('../helpers/calculateBMR');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { updateTokens } = require('../helpers/updateToken');
const Tokens = require('../models/tokens');
const cloudinary = require('cloudinary').v2;

dotenv.config();
const { JWT_SECRET } = process.env;

cloudinary.config({
  cloud_name: 'dxqzi4x9j',
  api_key: 417617877398435,
  api_secret: 'fYS2XkZOZeQb3Ra7a3eS91zkHQ4',
});

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const result = await Users.create({
      name,
      email,
      password: hashedPassword,
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
    res.status(204).json();
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
    html: `<a href='http://localhost:3000/users/verify/${user.verificationToken}'>Confirm verication email</a>`,
  });
  res.status(200).json({ message: 'Verification email sent' });
};

module.exports = {
  registerUser: controllerWrapper(registerUser),
  loginUser: controllerWrapper(loginUser),
  logOutUser: controllerWrapper(logOutUser),
  currentUser: controllerWrapper(currentUser),
  updateUser: controllerWrapper(updateUser),
  updateAvatar: controllerWrapper(updateAvatar),
  refreshToken: controllerWrapper(refreshToken),
};
