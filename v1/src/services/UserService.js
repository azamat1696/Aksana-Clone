const BaseService = require('./BaseService');
const Users = require('../models/Users');

class UserService extends BaseService {
    constructor() {
        super(Users);
    }
}
module.exports = new UserService();
