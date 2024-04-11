const httpStatus = require('http-status');
const SectionService = require('../services/SectionService');
const ApiErrors = require("../errors/ApiErrors");

class SectionController {
    index(req, res, next){
        SectionService.list().then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    create(req, res, next){
        req.body.user_id = req.user
        SectionService.create(req.body).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    };

    update  (req, res, next){
        SectionService.update(req.params.id,req.body).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    deleteSection(req,res,next){
        SectionService.delete(req.params.id).then(response => {
            if (!response) return next(new ApiErrors("Section not found", httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send({message: "Section deleted successfully"});
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));

    }

}
module.exports = new SectionController();
