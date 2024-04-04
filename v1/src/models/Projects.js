const Mongoose = require('mongoose');
const logger = require('../scripts/logger/Projects');
const ProjectSchema = new Mongoose.Schema({
   name: String,
   user_id: {
         type: Mongoose.Schema.Types.ObjectId,
         ref: 'Users'
   }
},{ timestamps: true,versionKey: false });

ProjectSchema.post('save', function (doc,next) {
    logger.log({
        level: 'info',
        message: doc
    });
    next();
});

module.exports = Mongoose.model('Projects', ProjectSchema);
