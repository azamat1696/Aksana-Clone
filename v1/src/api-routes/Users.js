//validate middleware
const validate = require('../middlewares/validate');
// validation schema
const { createUserValidation,loginUserValidation,resetPasswordValidation,updateUserValidation,changePasswordValidation } = require('../validations/Users');
const express = require('express');
const router = express.Router();
const { create,index,login,getProjects,resetPassword ,updateUser, deleteUser,changePassword} = require('../controllers/Users');
const authenticate = require('../middlewares/authenticate');
router.get('/', index);
router.route('/').post(validate(createUserValidation), create);
router.route('/').patch(authenticate,validate(updateUserValidation), updateUser);
router.route('/login').post(validate(loginUserValidation),login);
router.route('/projects').get(authenticate,getProjects);
router.route('/reset-password').post(validate(resetPasswordValidation),resetPassword);
router.route('/:id').delete(authenticate,deleteUser);
router.route('/change-password').patch(authenticate,validate(changePasswordValidation),changePassword);


module.exports = {
    router,
    path: '/users'
}

