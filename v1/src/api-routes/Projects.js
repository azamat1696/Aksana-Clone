//validate middleware
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
// validation schema
const { createProjectValidation,updateProjectValidation } = require('../validations/Projects');
const express = require('express');
const router = express.Router();
const ProjectController= require('../controllers/Project');

router.route('/').get(authenticate, ProjectController.index);
router.route('/').post(authenticate,validate(createProjectValidation), ProjectController.create);
router.route('/:id').patch(authenticate,validate(updateProjectValidation), ProjectController.update);
router.route('/:id').delete(authenticate, ProjectController.deleteProject);

module.exports = {
    router,
    path: '/projects'
}

