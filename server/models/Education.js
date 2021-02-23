const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
  },
  school: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  minors: {
    type: [String],
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('education', EducationSchema);