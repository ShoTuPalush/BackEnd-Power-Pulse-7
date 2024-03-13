const Joi = require('joi');

const exerciseSchema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'The date must be a number.',
    'any.required': 'The date field is required.',
    'date.empty': 'The date must not be empty.',
  }),
  exerciseId: Joi.string().required().messages({
    'string.base': 'The exerciseId must be a string.',
    'any.required': 'The exerciseId field is required.',
    'string.empty': 'The exerciseId must not be empty.',
  }),
  calories: Joi.number().required().min(1).messages({
    'number.base': 'The calories must be a number.',
    'any.required': 'The calories field is required.',
    'number.empty': 'The calories must not be empty.',
    'number.max': 'The calories must be > 1.',
  }),
  time: Joi.number().required().min(1).messages({
    'number.base': 'The time must be a number.',
    'any.required': 'The time field is required.',
    'number.empty': 'The time must not be empty.',
    'number.max': 'The time must be > 1.',
  }),
});

const productSchema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'The date must be a number.',
    'any.required': 'The date field is required.',
    'date.empty': 'The date must not be empty.',
  }),
  productId: Joi.string().required().messages({
    'string.base': 'The productId must be a string.',
    'any.required': 'The productId field is required.',
    'string.empty': 'The productId must not be empty.',
  }),
  calories: Joi.number().required().min(1).messages({
    'number.base': 'The calories must be a number.',
    'any.required': 'The calories field is required.',
    'number.empty': 'The calories must not be empty.',
    'number.max': 'The calories must be > 1.',
  }),
  amount: Joi.number().required().min(1).messages({
    'number.base': 'The amount must be a number.',
    'any.required': 'The amount field is required.',
    'number.empty': 'The amount must not be empty.',
    'number.max': 'The amount must be > 1.',
  }),
});

module.exports = { exerciseSchema, productSchema };
