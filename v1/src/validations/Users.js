const Joi = require('joi');

const createUserValidation = Joi.object({
    full_name: Joi.string().required().min(5),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    profile_image: Joi.string().optional()
});
const loginUserValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
});
const resetPasswordValidation = Joi.object({
    email: Joi.string().required().email(),
});
module.exports = {
    createUserValidation,
    loginUserValidation,
    resetPasswordValidation
}
