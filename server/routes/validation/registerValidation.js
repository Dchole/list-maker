const Joi = require("@hapi/joi")

const registerValidation = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  confirm: Joi.ref("password")
})

module.exports = registerValidation
