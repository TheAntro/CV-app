const express = require('express');
const {
  getUsers,
  getUser,
  registerUser,
  deleteUser,
} = require('../controllers/users');

const router = express.Router({ mergeParams: true });

router.route('/').get(getUsers).post(registerUser);
router.route('/:id').get(getUser).delete(deleteUser);

module.exports = router;
