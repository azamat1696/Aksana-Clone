const Mongoose = require('mongoose');
const UserSchema = new Mongoose.Schema({
    full_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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


module.exports = Mongoose.model('Users', UserSchema);
