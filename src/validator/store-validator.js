const Joi = require('joi')

exports.addStoreSchema = Joi.object({

    profileImage: Joi.string(),
    nameStore: Joi.string().required(),
    lineShoppingUrl: Joi.string().required(),
    emailStore: Joi.string().email({ tlds: false }).required(),
    phoneStore: Joi.string().required().pattern(/^[0-9]{10}$/)
    
})
