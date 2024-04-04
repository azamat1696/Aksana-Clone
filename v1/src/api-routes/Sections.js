//validate middleware
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
// validation schema
const { createSectionValidation,updateSectionValidation } = require('../validations/Sections');
const express = require('express');
const router = express.Router();
const { create,index,update,deleteSection } = require('../controllers/Sections');

router.route('/:projectId').get(authenticate, index);
router.route('/').post(authenticate,validate(createSectionValidation), create);
router.route('/:id').patch(authenticate,validate(updateSectionValidation), update);
router.route('/:id').delete(authenticate, deleteSection);

module.exports = {
    router,
    path: '/sections'
}

