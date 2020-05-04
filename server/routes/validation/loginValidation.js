const Joi = require("@hapi/joi")

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
})

module.exports = loginValidation
