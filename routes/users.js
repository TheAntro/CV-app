const express = require('express');
const {
  getUsers,
  getUser,
  registerUser,
  deleteUser,
} = require('../controllers/users');
const { protect } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });
router.use(protect);
router.route('/').get(getUsers).post(registerUser);
router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;
