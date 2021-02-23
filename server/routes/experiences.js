const express = require('express');
const {
  getAllExperience,
  addExperience,
  deleteExperiences,
  deleteExperience,
} = require('../controllers/experiences');
const { authorize, hasRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(authorize);

router
  .route('/')
  .get(getAllExperience)
  .post(addExperience)
  .delete(hasRole('admin'), deleteExperiences);
router.route('/:id').delete(deleteExperience);

module.exports = router;
