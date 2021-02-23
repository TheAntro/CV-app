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
  .get(authorize, hasRole('admin'), getUsers)
  .post(registerUser);
router.route('/:id')
  .all(authorize, hasRole('admin'))
  .get(getUser)
  .delete(deleteUser);

module.exports = router;
