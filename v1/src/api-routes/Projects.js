//validate middleware
const validate = require('../middlewares/validate');
// validation schema
const { createProjectValidation } = require('../validations/Projects');
const express = require('express');
const router = express.Router();
const { create,index } = require('../controllers/Projects');

router.get('/', index);
router.route('/').post(validate(createProjectValidation), create);


module.exports = {
    router,
    path: '/projects'
}

