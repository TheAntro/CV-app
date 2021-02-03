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
  mainskills: {
    type: [String],
    required: true,
  },
  otherskills: {
    type: [String],
  }
});

module.exports = mongoose.model('skill', SkillSchema);