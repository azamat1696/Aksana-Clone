//validate middleware
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const idChecker = require('../middlewares/idChecker');
// validation schema
const { createValidation,updateValidation, commentValidation} = require('../validations/Tasks');
const express = require('express');
const router = express.Router();
const TaskController= require('../controllers/Task');

router.route('/:id/all').get(idChecker,authenticate, TaskController.index);
router.route('/').post(authenticate,validate(createValidation), TaskController.create);
router.route('/:id').patch(idChecker,authenticate,validate(updateValidation), TaskController.update);
router.route('/:id/make-comment').post(idChecker,authenticate,validate(commentValidation), TaskController.makeComment);
router.route('/:id/comment/:commentId').patch(idChecker,authenticate,validate(commentValidation), TaskController.updateComment);
router.route('/:id/comment/:commentId').delete(idChecker,authenticate, TaskController.deleteComment);
router.route('/:id').delete(idChecker,authenticate, TaskController.deleteTask);

router.route('/:id/add-subtask').patch(idChecker,authenticate,validate(createValidation), TaskController.addSubTask);
router.route('/:id').get(idChecker,authenticate, TaskController.fetchTask);

module.exports = {
    router,
    path: '/tasks'
}

