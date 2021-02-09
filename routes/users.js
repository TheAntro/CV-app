const express = require('express');
const {
  getUsers,
  getUser,
  registerUser,
  deleteUser,
} = require('../controllers/users');
const { authorize, protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });
router.route('/').get(authorize, getUsers).post(registerUser);
router.route('/:id').all(authorize).get(getUser).delete(protect('admin'), deleteUser);

module.exports = router;
