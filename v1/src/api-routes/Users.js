//validate middleware
const validate = require('../middlewares/validate');
// validation schema
const { createUserValidation,loginUserValidation,resetPasswordValidation } = require('../validations/Users');
const express = require('express');
const router = express.Router();
const { create,index,login,getProjects,resetPassword } = require('../controllers/Users');
const authenticate = require('../middlewares/authenticate');
router.get('/', index);
router.route('/').post(validate(createUserValidation), create);
router.route('/login').post(validate(loginUserValidation),login);
router.route('/projects').get(authenticate,getProjects);
router.route('/reset-password').post(validate(resetPasswordValidation),resetPassword);


module.exports = {
    router,
    path: '/users'
}

