const express = require('express');
const {
  getUsers,
  getUser,
  registerUser,
  DeleteUser,
} = require('../controllers/users');

const router = express.Router({ mergeParams: true });

//router.route('/').get(getUsers).post(registerUser).delete(deleteUser);
//router.route('/:id').get(getUser);

module.exports = router;
