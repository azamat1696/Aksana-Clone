const Joi = require('joi');

const createValidation = Joi.object({
    title: Joi.string().required().min(5),
    description: Joi.string().optional(),
    section_id: Joi.string().required().optional(),
    project_id: Joi.string().required().optional(),
    assigned_to: Joi.string().optional(),
    due_date: Joi.date().optional(),
    statuses: Joi.array().items(Joi.string()).optional(),
    isCompleted: Joi.boolean().optional(),
    order: Joi.number().optional(),
    comments: Joi.array().items(Joi.object()).optional(),
    media: Joi.array().items(Joi.object()).optional(),
    sub_tasks: Joi.array().items(Joi.string()).optional(),
});
const updateValidation = Joi.object({
    title: Joi.string().min(5),
    description: Joi.string().optional(),
    section_id: Joi.string().required().optional(),
    project_id: Joi.string().required().optional(),
    assigned_to: Joi.string().optional(),
    due_date: Joi.date().optional(),
    statuses: Joi.array().items(Joi.string()).optional(),
    isCompleted: Joi.boolean().optional(),
    order: Joi.number().optional(),
    comments: Joi.array().items(Joi.object()).optional(),
    media: Joi.array().items(Joi.object()).optional(),
    sub_tasks: Joi.array().items(Joi.string()).optional(),
 });
const commentValidation = Joi.object({
    comment: Joi.string().required().min(5),
});
module.exports = {
    createValidation,
    updateValidation,
    commentValidation
}
