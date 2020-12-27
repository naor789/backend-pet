const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().min(6).required(),
        firstName: Joi.string().min(4).required(),
        lastName: Joi.string().min(4).required(),
        phoneNumber: Joi.string().min(10).required()
    })
return Joi.validate(data, schema)
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),

    })
    return Joi.validate(data, schema)
}

// const petsValidation = (data) => {
//     const schema = Joi.object({
//         name: Joi.string().required(),
//         adoptionStatus: Joi.string().min(3).required(),
//         height: Joi.string(),
//         weight: Joi.string(),
//         color: Joi.string().min(3),
//         bio: Joi.string().min(3),
//         dietaryRestrictions: Joi.string().min(3),
//         breed: Joi.string().min(3),

//     })
// }


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

