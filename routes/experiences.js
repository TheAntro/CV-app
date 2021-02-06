const express = require('express');
const {
  getAllExperience,
  addExperience,
  deleteExperiences,
  deleteExperience,
} = require('../controllers/experiences');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllExperience)
  .post(addExperience)
  .delete(deleteExperiences);
router.route('/:id').delete(deleteExperience);

module.exports = router;
