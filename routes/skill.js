const express = require('express');
const { getSkills, addSkills, deleteSkills } = require('../controllers/skill');

const router = express.Router({ mergeParams: true });

router.route('/').get(getSkills).post(addSkills).delete(deleteSkills);

module.exports = router;
