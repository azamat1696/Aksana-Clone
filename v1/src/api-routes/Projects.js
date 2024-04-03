//validate middleware
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
// validation schema
const { createProjectValidation,updateProjectValidation } = require('../validations/Projects');
const express = require('express');
const router = express.Router();
const { create,index,update } = require('../controllers/Projects');

router.route('/').get(authenticate, index);
router.route('/').post(authenticate,validate(createProjectValidation), create);
router.route('/:id').patch(authenticate,validate(updateProjectValidation), update);


module.exports = {
    router,
    path: '/projects'
}

