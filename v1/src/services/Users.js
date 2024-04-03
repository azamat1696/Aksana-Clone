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
const update = async (where,data) => {
    return Users.findOneAndUpdate(where, data, {new: true})
}
const remove = async (where) => {
    return Users.findOneAndDelete(where, {new: true})
}
module.exports = {
    insert,
    list,
    loginUser,
    update,
    remove
}
