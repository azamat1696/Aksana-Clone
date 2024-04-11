const BaseService = require('./BaseService');
const BaseModel = require('../models/Projects');

class ProjectService extends BaseService {
    constructor() {
        super(BaseModel);
    }
    list(where) {
        return this.model.find(where || {}).populate({
            path: 'user_id',
            select: 'full_name email'
        });
    }
}
module.exports = new ProjectService();
