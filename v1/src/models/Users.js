const Mongoose = require('mongoose');
const logger = require("../scripts/logger/Users");
const uniqueValidator = require('mongoose-unique-validator');
const UserSchema = new Mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        required: false,
    }
}, {timestamps: true, versionKey: false});
UserSchema.plugin(uniqueValidator, {type: 'mongoose-unique-validator',message: 'Email already in use'});

UserSchema.post('save', function (doc, next) {
    logger.log({
        level: 'info',
        message: doc
    });
    next();
});

module.exports = Mongoose.model('User', UserSchema);
