const Joi = require('joi');

const createProjectValidation = Joi.object({
    name: Joi.string().required().min(5)
});
const updateProjectValidation = Joi.object({
    name: Joi.string().required().min(5)
});

module.exports = {
    createProjectValidation,
    updateProjectValidation
}
