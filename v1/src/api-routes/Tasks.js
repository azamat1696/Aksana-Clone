//validate middleware
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
// validation schema
const { createValidation,updateValidation, commentValidation} = require('../validations/Tasks');
const express = require('express');
const router = express.Router();
const TaskController= require('../controllers/Task');

router.route('/:sectionId/all').get(authenticate, TaskController.index);
router.route('/').post(authenticate,validate(createValidation), TaskController.create);
router.route('/:id').patch(authenticate,validate(updateValidation), TaskController.update);
router.route('/:id/make-comment').post(authenticate,validate(commentValidation), TaskController.makeComment);
router.route('/:taskId/comment/:commentId').patch(authenticate,validate(commentValidation), TaskController.updateComment);
router.route('/:taskId/comment/:commentId').delete(authenticate, TaskController.deleteComment);
router.route('/:id').delete(authenticate, TaskController.deleteTask);

router.route('/:taskId/add-subtask').patch(authenticate,validate(createValidation), TaskController.addSubTask);
router.route('/:taskId').get(authenticate, TaskController.fetchTask);

module.exports = {
    router,
    path: '/tasks'
}

