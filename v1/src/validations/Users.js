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
const updateUserValidation = Joi.object({
    full_name: Joi.string().optional().min(5),
    email: Joi.string().optional().email(),
});
const changePasswordValidation = Joi.object({
    old_password: Joi.string().required().min(8),
    new_password: Joi.string().required().min(8),
});
const updateProfileImageValidation = Joi.object({
    file: Joi.string().required()
});
module.exports = {
    createUserValidation,
    loginUserValidation,
    resetPasswordValidation,
    updateUserValidation,
    changePasswordValidation,
    updateProfileImageValidation
}
