const Joi = require("@hapi/joi");

const registerValidation = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,}$")).required(),
  confirmPassword: Joi.ref("password")
});

module.exports = registerValidation;
