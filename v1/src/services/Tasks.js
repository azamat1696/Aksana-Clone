const Task = require('../models/Taks');

const findOne = async (where,expand) => {
    if(!expand) return Task.findOne(where);
    return Task.findOne(where).populate({
        path: 'user_id',
        select: 'full_name email profile_image'
    }).populate({
        path: 'project_id',
        select: 'name'
    }).populate({
        path: 'sub_tasks',
        populate: {
            path: 'user_id',
            select: 'full_name email profile_image'
        }
    }).populate({
        path: 'section_id',
    }).populate({
        path: 'comments',
        populate: {
            path: 'user_id',
            select: 'full_name email profile_image'
        }
    });
}
const insertTask = async (data) => {
    return new Task(data).save()
}
const getTasks = async (where) => {
    return Task.find(where || {}).populate({
        path: 'user_id',
        select: 'full_name email profile_image'
    }).populate({
        path: 'project_id',
        select: 'name'
    }).populate({
       path: 'sub_tasks',
    }).populate({
        path: 'comments',
        populate: {
            path: 'user_id'
        }
    });
}
const updateTask = async (data) => {
    return Task.findByIdAndUpdate(data.id, data, {new: true})
}
const removeTask = async (id) => {
    return Task.findByIdAndDelete(id, {new: true})
}

module.exports = {
    insertTask,
    getTasks,
    updateTask,
    removeTask,
    findOne
}
