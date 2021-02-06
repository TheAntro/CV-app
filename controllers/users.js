const User = require('../models/User');

// @desc Get all users
// @route GET /api/users
// @access Public
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc Get user by id
// @route GET /api/users/:id
// @access Public
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
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
    let user = new User(userObject);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc Delete a user by id
// @route DELETE /api/users/:id
// @access Public
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(200).json({ msg: `User ${req.params.id} deleted` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
