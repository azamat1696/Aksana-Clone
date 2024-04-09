const httpStatus = require('http-status');
const Service = require('../services/Sections');
const SectionService = new Service();

const index =  (req, res) => {
    // check if projectId is provided
    if (!req?.params?.id) return res.status(httpStatus.BAD_REQUEST).send({error: "projectId is required"});
    SectionService.list().then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(() => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "No sections found" });
    });

}
const create =  (req, res) => {
    req.body.user_id = req.user
    SectionService.create(req.body).then(response => {
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
    SectionService.update(req.params.id,req.body).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}
const deleteSection = async (req,res) => {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({error: "id is required"});

    SectionService.delete(req.params.id).then(response => {
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
