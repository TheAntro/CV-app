const express = require('express');
const {
  getAllEducation,
  addEducation,
  deleteEducations,
  deleteEducation,
} = require('../controllers/educations');
const { authorize, hasRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(authorize);

router
  .route('/')
  .get(getAllEducation)
  .post(addEducation)
  .delete(deleteEducations);
router.route('/:id').delete(deleteEducation);

module.exports = router;
