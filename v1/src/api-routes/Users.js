//validate middleware
const validate = require('../middlewares/validate');
// validation schema
const { createUserValidation,
    loginUserValidation,
    resetPasswordValidation,
    updateUserValidation,
    changePasswordValidation
} = require('../validations/Users');
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/User');
const authenticate = require('../middlewares/authenticate');
router.get('/', UserController.index);
router.route('/').post(validate(createUserValidation), UserController.create);
router.route('/').patch(authenticate,validate(updateUserValidation), UserController.updateUser);
router.route('/login').post(validate(loginUserValidation),UserController.login);
router.route('/projects').get(authenticate,UserController.getProjects);
router.route('/reset-password').post(validate(resetPasswordValidation),UserController.resetPassword);
router.route('/:id').delete(authenticate,UserController.deleteUser);
router.route('/change-password').patch(authenticate,validate(changePasswordValidation),UserController.changePassword);
router.route('/update-profile-image').post(authenticate,UserController.updateProfileImage);


module.exports = {
    router,
    path: '/users'
}

