const express = require('express');
const { getAllEducation } = require('../controllers/education');

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllEducation);

module.exports = router;