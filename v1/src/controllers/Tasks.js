const {insertTask,getTasks,removeTask,updateTask,findOne} = require("../services/Tasks")
const httpStatus = require('http-status');

const index =  (req, res) => {
    // check if projectId is provided
    if (!req?.params?.sectionId) return res.status(httpStatus.BAD_REQUEST).send({error: "projectId is required"});
    getTasks({section_id: req.params.sectionId }).then(response => {
        res.status(httpStatus.OK).send(response);
    }).catch(() => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "No sections found" });
    });

}
const create =  (req, res) => {
    req.body.user_id = req.user
     insertTask(req.body).then(response => {
         console.log(response)
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
    updateTask(req.body).then(response => {
        if (!response) return res.status(httpStatus.NOT_FOUND).send({error: "Task not found"});
        res.status(httpStatus.OK).send(response);
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
}
const deleteTask = async (req,res) => {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({error: "id is required"});

    removeTask(req.params.id).then(response => {
        if (!response) return res.status(httpStatus.NOT_FOUND).send({error: "Section not found"});

        res.status(httpStatus.OK).send({message: "Section deleted successfully"});
    }).catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });

}
const makeComment = async (req,res) => {
    req.body.user_id = req.user
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send({error: "id is required"});
    findOne({_id: req.params.id})
        .then(mainTask => {
        if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({error: "Task not found"});
        const comment = {
            value: req.body.comment,
            user_id: req.user,
            created_at: new Date(),
            updated_at: new Date()
        }
        mainTask.comments.push(comment);
        mainTask.save().then(response => {
          if (!response) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Error saving comment"});
            res.status(httpStatus.OK).send(response);
        }).catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err))

    })
        .catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    });
};
const updateComment = async (req,res) => {
    if (!req.params.taskId) return res.status(httpStatus.BAD_REQUEST).send({error: "taskId is required"});
    if (!req.params.commentId) return res.status(httpStatus.BAD_REQUEST).send({error: "commentId is required"});
    findOne({_id: req.params.taskId}).then(mainTask => {
        if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({error: "Task not found"});
        const comment = mainTask.comments.id(req.params.commentId);
        if (!comment) return res.status(httpStatus.NOT_FOUND).send({error: "Comment not found"});
        comment.value = req.body.comment;
        comment.updated_at = new Date();
        mainTask.save().then(response => {
            if (!response) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Error saving comment"});
            res.status(httpStatus.OK).send(response);
        }).catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err))
    })
}
const deleteComment = async (req,res) => {
    if (!req?.params?.taskId) return res.status(httpStatus.BAD_REQUEST).send({error: "taskId is required"});
    if (!req?.params?.commentId) return res.status(httpStatus.BAD_REQUEST).send({error: "commentId is required"});
    findOne({_id: req.params.taskId}).then(mainTask => {
        if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({error: "Task not found"});
        const comment = mainTask.comments.id(req.params.commentId);
        if (!comment) return res.status(httpStatus.NOT_FOUND).send({error: "Comment not found"});
        comment.deleteOne();
        mainTask.save().then(response => {
            if (!response) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Error saving comment"});
            res.status(httpStatus.OK).send(response);
        }).catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err))
    })
}
const addSubTask = async (req,res) => {
    if (!req?.params?.taskId) return res.status(httpStatus.BAD_REQUEST).send({error: "Task id is required"});
    findOne({_id: req.params.taskId}).then(mainTask => {
        if (!mainTask) return res.status(httpStatus.NOT_FOUND).send({error: "Task not found"});
        req.body.user_id = req.user
        insertTask(req.body).then(subTask => {
            if (!subTask) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Error saving sub task"});
            mainTask.sub_tasks.push(subTask);
            mainTask.save().then(response => {
                if (!response) return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({error: "Error saving sub task"});
                res.status(httpStatus.OK).send(response);
            }).catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err))
        }).catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err))
    }).catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err))
}
const fetchTask = async (req,res) => {
     if (!req.params?.taskId) return res.status(httpStatus.BAD_REQUEST).send({error: "id is required"});
    findOne({_id: req.params.taskId},true).then(response => {
        if (!response) return res.status(httpStatus.NOT_FOUND).send({error: "Task not found"});
        console.log(response)
        res.status(httpStatus.OK).send(response);
    }).catch(err => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err));
}
module.exports = {
    create,
    index,
    update,
    deleteTask,
    makeComment,
    updateComment,
    deleteComment,
    addSubTask,
    fetchTask
}
