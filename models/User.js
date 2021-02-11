const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      'Please add a valid email',
    ],
    required: true,
    unique: [true, 'User already exists'],
  },
  password: {
    type: String,
    required: true,
  },
  // Role cannot be set during registration. 
  // Can be changed to 'admin', but only directly in MongoDB
  role: {
    type: String,
    default: 'user',
  },
});

module.exports = mongoose.model('user', UserSchema);
