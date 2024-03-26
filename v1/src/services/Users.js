const Users = require('../models/Users');

const insert = async (userData) => {
    const user = new Users(userData)
    return user.save()
}
const list = async () => {
    return Users.find({});
}
const loginUser = async (userData) => {

    return Users.findOne(userData);
}
module.exports = {
    insert,
    list,
    loginUser
}
