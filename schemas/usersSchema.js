const Joi = require('joi');

const bodyUserRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'gmail'] },
    })
    .required(),
  password: Joi.string().min(6).max(30).required(),
});

const bodyUserLoginSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'gmail'] },
    })
    .required(),
  password: Joi.string().min(6).max(30).required(),
});

module.exports = (bodyUserLoginSchema, bodyUserRegisterSchema);
