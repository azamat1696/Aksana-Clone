//validate middleware
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
// validation schema
const { createValidation,updateValidation, commentValidation} = require('../validations/Tasks');
const express = require('express');
const router = express.Router();
const {
    create,
    index,
    update,
    deleteTask,
    makeComment,
    updateComment,
    deleteComment,
    addSubTask,
    fetchTask
} = require('../controllers/Tasks');

router.route('/:sectionId/all').get(authenticate, index);
router.route('/').post(authenticate,validate(createValidation), create);
router.route('/:id').patch(authenticate,validate(updateValidation), update);
router.route('/:id/make-comment').post(authenticate,validate(commentValidation), makeComment);
router.route('/:taskId/comment/:commentId').patch(authenticate,validate(commentValidation), updateComment);
router.route('/:taskId/comment/:commentId').delete(authenticate, deleteComment);
router.route('/:id').delete(authenticate, deleteTask);

router.route('/:taskId/add-subtask').patch(authenticate,validate(createValidation), addSubTask);
router.route('/:taskId').get(authenticate, fetchTask);

module.exports = {
    router,
    path: '/tasks'
}

