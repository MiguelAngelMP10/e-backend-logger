const Joi = require("joi");

const applicationSchema = Joi.object({
  name: Joi.string().required(),
});

const authorizationSchema = Joi.object({
  application_id: Joi.string().required(),
});

module.exports = { applicationSchema, authorizationSchema };
