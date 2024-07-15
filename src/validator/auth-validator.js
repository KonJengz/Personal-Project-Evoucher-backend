const Joi = require('joi')

exports.registerSchema = Joi.object({

    email: Joi.string().email({ tlds: false }).required(),
    password: Joi.string().required().pattern(/^[a-zA-Z0-9]{6,}/).trim(),
    confirmPassword: Joi.string().required().valid( Joi.ref('password')).strip(),
    phone: Joi.string().required().pattern(/^[0-9]{10}$/)

})

exports.loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})