const httpStatus = require('http-status');
const ApiErrors = require('../errors/ApiErrors');
const idChecker = (req, res, next) => {
    Object.values(req.params).forEach((param) => {
        if (!param?.match(/^[0-9a-fA-F]{24}$/)) {
            return next(new ApiErrors('Invalid id is provider.', httpStatus.BAD_REQUEST));
        }
    });
    next();
}
module.exports = idChecker;
