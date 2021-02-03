const express = require('express');
const { 
  getProfile,
  createProfile,
  deleteProfile
} = require('../controllers/profile');

const router = express.Router({ mergeParams: true });

router.route('/').get(getProfile).post(createProfile).delete(deleteProfile);

module.exports = router;