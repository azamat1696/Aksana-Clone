const BaseService = require('./BaseService');
const BaseModel = require('../models/Sections')
class SectionService extends BaseService {
    constructor() {
        super(BaseModel);
    }
    list(where) {
        return this.model.find(where || {}).populate({
            path: 'user_id',
            select: 'full_name email profile_image'
        }).populate({
            path: 'project_id',
            select: 'name'
        });
    }
}
module.exports = new SectionService();
