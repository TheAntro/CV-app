const express = require('express');
const {
  getUsers,
  getUser,
  registerUser,
  deleteUser,
} = require('../controllers/users');
const { authorize, hasRole } = require('../middleware/auth');

const router = express.Router({ mergeParams: true });
router.route('/')
  .get(authorize, getUsers)
  .post(registerUser);
router.route('/:id')
  .all(authorize)
  .get(getUser)
  .delete(hasRole('admin'), deleteUser);

module.exports = router;
