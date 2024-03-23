const {insertProject,getProjects} = require("../services/Projects")
const httpStatus = require('http-status');

const create =  (req, res) => {
     insertProject(req.body).then(response => {
        res.status(httpStatus.OK).send(response);
     }).catch(err => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
     });
};

const index =  (req, res) => {
    getProjects().then(response => {
        res.status(httpStatus.OK).send(response);
     }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

}

module.exports = {
    create,
    index
}
