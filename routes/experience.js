const express = require('express');
const { getAllExperience, addExperience } = require('../controllers/experience');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllExperience).post(addExperience);

module.exports = router;