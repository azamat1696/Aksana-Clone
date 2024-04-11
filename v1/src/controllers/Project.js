const httpStatus = require('http-status');
const ProjectService = require('../services/ProjectService');
const ApiErrors = require('../errors/ApiErrors');
class ProjectController {
    index (req, res, next) {
        ProjectService.list({user_id: req.user._doc._id}).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err.message, httpStatus.INTERNAL_SERVER_ERROR)));

    }
    create (req, res,next)  {
        req.body.user_id = req.user
        ProjectService.create(req.body).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err.message, httpStatus.INTERNAL_SERVER_ERROR)));
    };

    update(req, res, next) {
        ProjectService.update(req.params.id,req.body).then(response => {
            if (!response) return next(new ApiErrors('Project not found', httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    deleteProject (req,res,next){
        ProjectService.delete(req.params.id).then(response => {
            if (!response) return next(new ApiErrors('Project not found', httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send({message: "Project deleted successfully"});
        }).catch((err) => next(new ApiErrors(err.message, httpStatus.INTERNAL_SERVER_ERROR)));

    }
}
module.exports = new ProjectController();
