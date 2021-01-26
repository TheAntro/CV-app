const express = require('express');
const { getAllExperience } = require('../controllers/experience');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllExperience);

module.exports = router;