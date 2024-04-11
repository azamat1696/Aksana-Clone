const httpStatus = require('http-status');
const ProjectService = require('../services/ProjectService');

class ProjectController {
    index (req, res) {
        ProjectService.list({user_id: req.user._doc._id}).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });

    }
    create (req, res)  {
        req.body.user_id = req.user
        ProjectService.create(req.body).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });
    };

    update(req, res) {
        if (!req.params) {
            res.status(httpStatus.BAD_REQUEST).send({error: "id is required"});
            return;
        }
        ProjectService.update(req.params.id,req.body).then(response => {
            if (!response) {
                res.status(httpStatus.NOT_FOUND).send({error: "Project not found"});
                return;
            }
            res.status(httpStatus.OK).send(response);
        }).catch(() => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Project not found"});
        });
    }
    deleteProject (req,res){
        if (!req.params.id) {
            res.status(httpStatus.BAD_REQUEST).send({error: "id is required"});
            return;
        }
        const id = req.params.id;
        ProjectService.delete(id).then(response => {
            if (!response) {
                res.status(httpStatus.NOT_FOUND).send({error: "Project not found"});
                return;
            }
            res.status(httpStatus.OK).send({message: "Project deleted successfully"});
        }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
        });

    }
}
module.exports = new ProjectController();
