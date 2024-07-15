const createError = require("../utils/create-error")
const { registerSchema, loginSchema } = require("../validator/auth-validator")
const { addStoreSchema } = require('../validator/store-validator')

exports.registerValidator = (req ,res, next) => {
    console.log('first')
    const {value, error} = registerSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message})
    }
    req.body = value
    next()
}

exports.loginValidator =  (req, res, next) => {
    const {error} = loginSchema.validate(req.body);
    if (error) {
       return res.status(400).json({message: error.details[0].message})
    }
    next();
 };

exports.addstoreValidator = (req ,res, next) => {
    const {value, error} = addStoreSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message})
    }

    console.log(value)
    req.body = value
    next()
}

exports.validateUploadImageProfile = ( req, res, next ) => {
    if (!req.files) {
        return createError({
            message: 'at least one of logo image',
            statusCode: 400
        })
    }
    next()
}