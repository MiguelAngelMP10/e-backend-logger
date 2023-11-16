const Joi = require("joi");

const logsCreateSchema = Joi.object({
  type: Joi.string().valid("error", "info", "warning").required(),
  priority: Joi.string()
    .valid("lowest", "low", "medium", "high", "highest")
    .required(),
  path: Joi.string().required(),
  message: Joi.string().required(),
  request: Joi.object({
    data: Joi.any().required(),
  }),
  response: Joi.object({
    data: Joi.any().required(),
  }),
});

const applicationSchema = Joi.object({
  name: Joi.string().required(),
});

const authorizationSchema = Joi.object({
  application_id: Joi.string().required(),
});

module.exports = { applicationSchema, authorizationSchema, logsCreateSchema };
