const express = require('express');
const { 
  getSkills, 
  addSkills, 
  deleteSkills, 
  deleteSkill 
} = require('../controllers/skill');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSkills).post(addSkills).delete(deleteSkills);
router.route('/:id').delete(deleteSkill);

module.exports = router;
