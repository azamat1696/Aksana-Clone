//validate middleware
const validate = require('../middlewares/validate');
// validation schema
const { createUserValidation,loginUserValidation } = require('../validations/Users');
const express = require('express');
const router = express.Router();
const { create,index,login } = require('../controllers/Users');

router.get('/', index);
router.route('/').post(validate(createUserValidation), create);
router.route('/login').post(validate(loginUserValidation),login);


module.exports = {
    router,
    path: '/users'
}

