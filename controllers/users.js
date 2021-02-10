const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc Get all users
// @route GET /api/users
// @access Admin
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    users ? res.status(200).json({data: users}) : res.status(404).json({ msg: 'No users found'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc Get user by id
// @route GET /api/users/:id
// @access Admin
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user ? res.status(200).json({data: user}) : res.status(404).json({ msg: 'User not found'});
  } catch (err) {
    console.error(err.message);
    err.kind === 'ObjectId' ? res.status(400).json({ msg: `id ${req.params.id} is not valid`}) : res.status(500).send('Server Error');
  }
};

// @desc Register a user
// @route POST /api/users
// @access Public
exports.registerUser = async (req, res) => {
  let userObject = {};
  userObject.email = req.body.email;
  userObject.password = req.body.password;
  try {
    userObject.password = await bcrypt.hash(req.body.password, 8);
    console.log(userObject.password);
    let user = new User(userObject);
    await user.save();
    res.status(201).json({data: user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc Delete a user by id
// @route DELETE /api/users/:id
// @access Admin
exports.deleteUser = async (req, res) => {
  try {
    const removed = await User.findByIdAndRemove(req.params.id);
    removed ? res.status(200).json({ msg: `User ${req.params.id} deleted` }): res.status(404).json({ msg: 'User not found'});
  } catch (err) {
    console.error(err.message);
    err.kind === 'ObjectId' ? res.status(400).json({ msg: `id ${req.params.id} is not valid`}) : res.status(500).send('Server Error');
  }
};
