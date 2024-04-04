const {insertSection,getSections,removeSection,updateSection} = require("../services/Sections")
const httpStatus = require('http-status');

const index =  (req, res) => {
    // check if projectId is provided
    if (!req?.params?.projectId) return res.status(httpStatus.BAD_REQUEST).send({error: "projectId is required"});
    getSections({project_id: req.params.projectId }).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(() => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "No sections found" });
    });

}
const create =  (req, res) => {
    req.body.user_id = req.user
     insertSection(req.body).then(response => {
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
    updateSection(req.body).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}
const deleteSection = async (req,res) => {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({error: "id is required"});

    removeSection(req.params.id).then(response => {
        if (!response) return res.status(httpStatus.NOT_FOUND).send({error: "Section not found"});

        res.status(httpStatus.OK).send({message: "Section deleted successfully"});
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

}

module.exports = {
    create,
    index,
    update,
    deleteSection
}
