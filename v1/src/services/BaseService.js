
class BaseService {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        return this.model.create(data);
    }

    async list(where) {
        return this.model.find(where || {});
    }

    async findOne(where) {
        return this.model.findOne(where || {});
    }

    async update(where, data) {
        return this.model.findByIdAndUpdate(where, data, { new: true });
    }
    async updateWhere(where, data) {
        return this.model.findOneAndUpdate(where,data, { new: true });
    }
    async delete(id) {
        return this.model.findByIdAndDelete(id, { new: true });
    }
}
module.exports = BaseService;
