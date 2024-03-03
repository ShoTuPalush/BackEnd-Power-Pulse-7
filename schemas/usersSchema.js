const Joi = require('joi');

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

const bodyUserRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(new RegExp(emailRegex)).required(),
  password: Joi.string().min(6).max(30).required(),
});

const bodyUserLoginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegex)).required(),
  password: Joi.string().min(6).max(30).required(),
});

const maxDate = `${new Date().getMonth() + 1}-${new Date().getDate()}-${
  new Date().getFullYear() - 18
}`;

const bodyUserUpdateSchema = Joi.object({
  name: Joi.string().required(),
  height: Joi.number().required().min(150),
  currentWeight: Joi.number().required().min(35),
  desiredWeight: Joi.number().required().min(35),
  birthday: Joi.date().max(maxDate).required(),
  blood: Joi.number().required().valid(1, 2, 3, 4),
  levelActivity: Joi.number().required().valid(1, 2, 3, 4, 5),
  sex: Joi.string().required().valid('male', 'female'),
});

const bodyUserRefreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const bodyUserValidateTwoSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegex)).required(),
});

module.exports = {
  bodyUserLoginSchema,
  bodyUserRegisterSchema,
  bodyUserUpdateSchema,
  bodyUserRefreshSchema,
  bodyUserValidateTwoSchema,
};
