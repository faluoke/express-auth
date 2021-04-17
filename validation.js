const joi = require('joi');

const ValidateRegistration = data => {
    const schema = joi.object({
        firstName: joi.string().require(),
        lastName: joi.string().required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(8).required()
    });
    return schema.validate(data);
}

const ValidateLogin = data => {
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(8).required()
    });
    return schema.validate(data);
}

module.exports = {ValidateRegistration, ValidateLogin};