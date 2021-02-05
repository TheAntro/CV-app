const express = require('express');
const { 
  getAllEducation, 
  addEducation,
  deleteEducations, 
  deleteEducation } = require('../controllers/education');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllEducation).post(addEducation).delete(deleteEducations);
router.route('/:id').delete(deleteEducation);

module.exports = router;