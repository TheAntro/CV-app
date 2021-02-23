const mongoose = require('mongoose');

const ReferenceSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
  },
  name: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  company: {
    type: String,
  },
});

module.exports = mongoose.model('reference', ReferenceSchema);
