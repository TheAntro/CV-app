const express = require('express');
const { 
  getProfile,
  createProfile
} = require('../controllers/profile');

const router = express.Router({ mergeParams: true });

router.route('/').get(getProfile)//.post(createProfile);

module.exports = router;