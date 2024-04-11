const BaseService = require('./BaseService');
const Task = require('../models/Taks');

class TaskService extends BaseService {
    constructor() {
        super(Task);
    }

    async findOne (where,expand){
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

    async list(where) {
        return Task.find(where || {}).populate([
                {
                    path: 'user_id',
                    select: 'full_name email profile_image'
                },
                {
                    path: 'project_id',
                    select: 'name'
                },
                {
                    path: 'sub_tasks',
                },
                {
                    path: 'comments',
                    populate: {
                        path: 'user_id'
                    }
                }
            ]);
    }
}
module.exports = new TaskService();
