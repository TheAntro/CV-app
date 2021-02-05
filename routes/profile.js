const express = require('express');
const { 
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile
} = require('../controllers/profile');

const router = express.Router({ mergeParams: true });

router.route('/').get(getProfiles).post(createProfile).delete(deleteProfile);
router.route('/:id').get(getProfile);

module.exports = router;