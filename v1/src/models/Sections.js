const Mongoose = require('mongoose');
const logger = require('../scripts/logger/Sections');

const SectionSchema = new Mongoose.Schema({
    name: String,
    user_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project_id: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    order: Number
},{ timestamps: true , versionKey: false});

SectionSchema.post('save', function (doc, next) {
    logger.log({
        level: 'info',
        message: doc
    });
    next();
});

module.exports = Mongoose.model('Section', SectionSchema);
