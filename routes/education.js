const express = require('express');
const { getAllEducation, addEducation } = require('../controllers/education');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllEducation).post(addEducation);

module.exports = router;