const Joi = require("joi");

const validateData = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);

    if (result.error) {
      return res.status(422).json({ error: result.error.details[0].message });
    }

    req.validatedData = result.value;
    next();
  };
};

module.exports = validateData;
