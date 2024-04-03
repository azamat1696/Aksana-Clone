const {insertProject,getProjects,updateProject,removeProject} = require("../services/Projects")
const httpStatus = require('http-status');

const index =  (req, res) => {
    getProjects().then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

}
const create =  (req, res) => {
    req.body.user_id = req.user
     insertProject(req.body).then(response => {
        res.status(httpStatus.OK).send(response);
     }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
     });
};

const update =  (req, res) => {
    if (!req.params) {
        res.status(httpStatus.BAD_REQUEST).send({error: "id is required"});
        return;
    }
    updateProject(req.params.id).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}
const deleteProject = async (req,res) => {
    if (!req.params.id) {
        res.status(httpStatus.BAD_REQUEST).send({error: "id is required"});
        return;
    }
    const id = req.params.id;
    removeProject(id).then(response => {
        if (!response) {
            res.status(httpStatus.NOT_FOUND).send({error: "Project not found"});
            return;
        }
        res.status(httpStatus.OK).send({message: "Project deleted successfully"});
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

}

module.exports = {
    create,
    index,
    update,
    deleteProject
}
