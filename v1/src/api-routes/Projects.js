//validate middleware
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
// validation schema
const { createProjectValidation } = require('../validations/Projects');
const express = require('express');
const router = express.Router();
const { create,index } = require('../controllers/Projects');

router.route('/').get(authenticate, index);
router.route('/').post(validate(createProjectValidation), create);


module.exports = {
    router,
    path: '/projects'
}

