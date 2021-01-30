const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add name'],
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please add street address'],
    },
    zipcode: {
      type: String,
      required: [true, 'Please add zipcode'],
    },
    city: {
      type: String,
      required: [true, 'Please add city'],
    },
  },
  email: {
    type: String,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    maxlength: [16, 'Max length for phone number is 16 characters'],
  },
  social: {
    linkedin: String,
    github: String,
    scholar: String,
  },
  photo: String,
});

module.exports = mongoose.model('profile', ProfileSchema);