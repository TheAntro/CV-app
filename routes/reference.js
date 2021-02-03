const express = require('express');
const { getReferences, addReference } = require('../controllers/reference');

const router = express.Router({ mergeParams: true });

router.route('/').get(getReferences).post(addReference);

module.exports = router;
