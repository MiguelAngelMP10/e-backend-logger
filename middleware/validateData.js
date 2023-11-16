const Joi = require("joi");

const validateData = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false });
    if (result.error) {
      // Mostrar todos los errores
      const apiErrors = result.error.details.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));
    
      return res.status(422).json({ errors: apiErrors });
    } else {
      req.validatedData = result.value;
      next();
    }
  };
};

module.exports = validateData;
