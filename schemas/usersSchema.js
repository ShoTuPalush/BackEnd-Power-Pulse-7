const Joi = require('joi');

const emailRegexp = /^w+@[a-zA-Z_]+?.[a-zA-Z]{2,3}$/;

const bodyUserRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).max(30).required(),
});

const bodyUserLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).max(30).required(),
});

module.exports = (bodyUserLoginSchema, bodyUserRegisterSchema);
