const Joi = require('joi');

const createSectionValidation = Joi.object({
    name: Joi.string().required().min(5),
    project_id: Joi.string().optional(),
});
const updateSectionValidation = Joi.object({
    name: Joi.string().required().min(5),
    project_id: Joi.string().optional(),
 });

module.exports = {
    createSectionValidation,
    updateSectionValidation
}
