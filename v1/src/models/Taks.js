const Mongoose = require('mongoose');
const logger = require('../scripts/logger/Tasks');

const TaskSchema = new Mongoose.Schema({
    title: String,
    description: String,
    assigned_to: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    due_date: Date,
    statuses: [String],
    section_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Section'
    },
    project_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    user_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isCompleted: Boolean,
    order: Number,
    comments: [
        {
            value: String,
            created_at: Date,
            updated_at: Date,
            user_id: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            liked : [
                {
                    type: Mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            ],
        }
    ],
    media: [
        {
            file: String,
            user_id: {
                type: Mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    sub_tasks: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
},{ timestamps: true , versionKey: false});

TaskSchema.post('save', function (doc, next) {
    logger.log({
        level: 'info',
        message: doc
    });
    next();
});

module.exports = Mongoose.model('Task', TaskSchema);
