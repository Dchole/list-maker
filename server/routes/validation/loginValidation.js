const Joi = require("@hapi/joi");

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,}$")).required()
});

module.exports = loginValidation;
