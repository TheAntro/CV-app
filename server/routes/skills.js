const express = require('express');
const {
  getSkills,
  addSkills,
  deleteSkills,
  deleteSkill,
} = require('../controllers/skills');
const { authorize, hasRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.use(authorize);

router.route('/')
  .get(getSkills)
  .post(addSkills)
  .delete(hasRole('admin'), deleteSkills);
router.route('/:id')
  .delete(deleteSkill);

module.exports = router;
