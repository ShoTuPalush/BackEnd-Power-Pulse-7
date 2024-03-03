const Joi = require("joi");

const exerciseSchema = Joi.object({
  date: Joi.date().required(),
  exerciseId: Joi.string().required(),
  calories: Joi.number().required().min(1),
  time: Joi.number().required().min(1),
});

const productSchema = Joi.object({
  date: Joi.date().required(),
  productId: Joi.string().required(),
  calories: Joi.number().required().min(1),
  amount: Joi.number().required().min(1),
});
const AlldayShema = Joi.object({
  date: Joi.date().required(),
});

module.exports = (exerciseSchema, productSchema, AlldayShema);
