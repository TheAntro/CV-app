const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'profiles',
  },
  description: {
    type: String,
    required: true,
  },
  mainSkills: {
    type: [String],
    required: true,
  },
  otherSkills: {
    type: [String],
  }
});

module.exports = mongoose.model('skill', SkillSchema);