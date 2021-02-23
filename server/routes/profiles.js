const express = require('express');
const {
  getProfiles,
  getProfile,
  createProfile,
  deleteProfile,
} = require('../controllers/profiles');
const { authorize, hasRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });

router.route('/').get(getProfiles).post(authorize, createProfile);
router.route('/:id').get(getProfile).delete(authorize, deleteProfile);

module.exports = router;
