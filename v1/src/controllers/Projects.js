const {insertProject,getProjects,updateProject} = require("../services/Projects")
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
    req.body.id = req.params.id;
    updateProject(req.body).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}

module.exports = {
    create,
    index,
    update
}
