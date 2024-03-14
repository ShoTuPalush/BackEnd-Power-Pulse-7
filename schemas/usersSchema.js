const Joi = require('joi');

const emailRegex = /^[a-z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

const name = Joi.string().required().messages({
  'string.base': 'The name must be a string.',
  'any.required': 'The name field is required.',
  'string.empty': 'The name must not be empty.',
});

const email = Joi.string().pattern(new RegExp(emailRegex)).required().messages({
  'string.base': 'The email must be a string.',
  'any.required': 'The email field is required.',
  'string.empty': 'The email must not be empty.',
  'string.pattern.base': 'The email must be in format test@gmail.com.',
});

const password = Joi.string().min(6).max(30).required().messages({
  'string.base': 'The password must be a string.',
  'any.required': 'The password field is required.',
  'string.empty': 'The password must not be empty.',
  'string.min': 'The password must be > 6.',
  'string.max': 'The password must  be < 30.',
});

const bodyUserRegisterSchema = Joi.object({
  name,
  email,
  password,
});

const bodyUserLoginSchema = Joi.object({
  email,
  password,
});

const maxDate = `${new Date().getMonth() + 1}-${new Date().getDate()}-${
  new Date().getFullYear() - 18
}`;

const bodyUserUpdateSchema = Joi.object({
  name,
  height: Joi.number().required().min(150).messages({
    'number.base': 'The height must be a number.',
    'any.required': 'The height field is required.',
    'number.empty': 'The height must not be empty.',
    'number.max': 'The height must be > 150.',
  }),
  currentWeight: Joi.number().required().min(35).messages({
    'number.base': 'The currentWeight must be a number.',
    'any.required': 'The currentWeight field is required.',
    'number.empty': 'The currentWeight must not be empty.',
    'number.max': 'The currentWeight must be > 35.',
  }),
  desiredWeight: Joi.number().required().min(35).messages({
    'number.base': 'The desiredWeight must be a number.',
    'any.required': 'The desiredWeight field is required.',
    'number.empty': 'The desiredWeight must not be empty.',
    'number.max': 'The desiredWeight must be > 35.',
  }),
  birthday: Joi.date().max(maxDate).required().messages({
    'date.base': 'The birthday must be a number.',
    'any.required': 'The birthday field is required.',
    'date.empty': 'The birthday must not be empty.',
    'date.max': 'The birthday must be > 18 year.',
  }),
  blood: Joi.number().required().valid(1, 2, 3, 4).messages({
    'number.base': 'The blood must be a number.',
    'any.required': 'The blood field is required.',
    'number.empty': 'The blood must not be empty.',
    'any.invalid': 'The blood must be [1, 2, 3, 4]}',
  }),
  levelActivity: Joi.number().required().valid(1, 2, 3, 4, 5).messages({
    'number.base': 'The levelActivity must be a number.',
    'any.required': 'The levelActivity field is required.',
    'number.empty': 'The levelActivity must not be empty.',
    'any.invalid': 'The levelActivity must be [1, 2, 3, 4, 5]',
  }),
  sex: Joi.string().required().valid('male', 'female').messages({
    'string.base': 'The sex must be a string.',
    'any.required': 'The sex field is required.',
    'any.invalid': 'The sex must be [male, female]',
  }),
});

const bodyUserRefreshSchema = Joi.object({
  refreshToken: Joi.string().required().messages({
    'string.base': 'The name must be a string.',
    'any.required': 'The name field is required.',
    'string.empty': 'The name must not be empty.',
  }),
});

const bodyUserValidateTwoSchema = Joi.object({
  email,
});

module.exports = {
  bodyUserLoginSchema,
  bodyUserRegisterSchema,
  bodyUserUpdateSchema,
  bodyUserRefreshSchema,
  bodyUserValidateTwoSchema,
};
