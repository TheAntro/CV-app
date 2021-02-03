const Skill = require('../models/Skill');

// @desc  Get all references
// @route GET /api/reference
// @access Public
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.status(200).json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Add a reference
// @route POST /api/reference
// @access Public
exports.addSkills = async (req, res) => {
  const { profile, description, mainSkills, otherSkills } = req.body;

  const skillsObject = {};
  if (profile) skillsObject.profile = profile;
  if (description) skillsObject.description = description;
  if (mainSkills) skillsObject.mainSkills = mainSkills;
  if (otherSkills) skillsObject.otherSkills = otherSkills;

  try {
    const skills = new Skill(skillsObject);
    await skills.save();
    return res.status(201).json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete profile
// @route DELETE /api/profile
// @access Public
exports.deleteSkills = async (req, res) => {
  try {
    await Skill.deleteMany();
    res.status(200).json({ msg: 'All Skills Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
