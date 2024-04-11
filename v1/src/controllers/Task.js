const httpStatus = require('http-status');
const TaskService = require('../services/TaskService');
const ApiErrors = require("../errors/ApiErrors");

class TaskController {

    index(req, res, next){
        TaskService.list({section_id: req.params.id }).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    create(req, res, next){
        req.body.user_id = req.user
        TaskService.create(req.body).then(response => {
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    };
    update(req, res, next){
         TaskService.update(req.params.id,req.body).then(response => {
            if (!response) return next(new ApiErrors("Task not found", httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }
    deleteTask(req,res, next){
         TaskService.delete(req.params.id).then(response => {
            if (!response) return next(new ApiErrors("Task not found", httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send({message: "Section deleted successfully"});
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));

    }
    makeComment(req,res, next){
        req.body.user_id = req.user
        TaskService.findOne({_id: req.params.id})
            .then(mainTask => {
                if (!mainTask) return next(new ApiErrors("Task not found", httpStatus.NOT_FOUND));
                const comment = {
                    value: req.body.comment,
                    user_id: req.user,
                    created_at: new Date(),
                    updated_at: new Date()
                }
                mainTask.comments.push(comment);
                mainTask.save().then(response => {
                    if (!response) return next(new ApiErrors("Error saving comment", httpStatus.INTERNAL_SERVER_ERROR));
                    res.status(httpStatus.OK).send(response);
                }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)))

            })
            .catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    };
    updateComment(req,res, next) {
        TaskService.findOne({_id: req.params.id}).then(mainTask => {
            if (!mainTask) return next(new ApiErrors("Task not found", httpStatus.NOT_FOUND));
            const comment = mainTask.comments.id(req.params.commentId);
            if (!comment) return next(new ApiErrors("Comment not found", httpStatus.NOT_FOUND));
            comment.value = req.body.comment;
            comment.updated_at = new Date();
            mainTask.save().then(response => {
                if (!response) return next(new ApiErrors("Error saving comment", httpStatus.INTERNAL_SERVER_ERROR));
                res.status(httpStatus.OK).send(response);
            }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)))
        })
    }
    deleteComment(req,res, next){
        TaskService.findOne({_id: req.params.id}).then(mainTask => {
            if (!mainTask) return next(new ApiErrors("Task not found", httpStatus.NOT_FOUND));
            const comment = mainTask.comments.id(req.params.commentId);
            if (!comment) return next(new ApiErrors("Comment not found", httpStatus.NOT_FOUND));
            comment.deleteOne();
            mainTask.save().then(response => {
                if (!response) return next(new ApiErrors("Error deleting comment", httpStatus.INTERNAL_SERVER_ERROR));
                res.status(httpStatus.OK).send(response);
            }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)))
        })
    }
    addSubTask(req,res, next){
        TaskService.findOne({_id: req.params.id}).then(mainTask => {
            if (!mainTask) return next(new ApiErrors("Task not found", httpStatus.NOT_FOUND));
            req.body.user_id = req.user
            TaskService.create(req.body).then(subTask => {
                if (!subTask) return next(new ApiErrors("Error creating sub task", httpStatus.INTERNAL_SERVER_ERROR));
                mainTask.sub_tasks.push(subTask);
                mainTask.save().then(response => {
                    if (!response) return next(new ApiErrors("Error saving sub task", httpStatus.INTERNAL_SERVER_ERROR));
                    res.status(httpStatus.OK).send(response);
                }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)))
            }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)))
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)))
    }
    fetchTask(req,res, next){
        TaskService.findOne({_id: req.params.id},true).then(response => {
            if (!response) return next(new ApiErrors("Task not found", httpStatus.NOT_FOUND));
            res.status(httpStatus.OK).send(response);
        }).catch((err) => next(new ApiErrors(err?.message, httpStatus.INTERNAL_SERVER_ERROR)));
    }

}
module.exports = new TaskController();
