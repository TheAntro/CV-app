const Skill = require('../models/Skill');

// @desc  Get all skills
// @route GET /api/skills
// @access Public
exports.getSkills = async (req, res) => {
  if (req.user.role === 'admin') {
    try {
      const AllSkills = await Skill.find();
      res.status(200).json(AllSkills);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  } else {
    try {
      const skills = await Skill.find({ profile: req.user.profileId });
      res.status(200).json(skills);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
};

// @desc  Add a skill
// @route POST /api/skills
// @access Public
exports.addSkills = async (req, res) => {
  const { profile, description, mainSkills, otherSkills } = req.body;

  const skillsObject = {};
  if (profile) skillsObject.profile = profile;
  if (description) skillsObject.description = description;
  if (mainSkills)
    skillsObject.mainSkills = mainSkills
      .split(',')
      .map((skill) => skill.trim());
  if (otherSkills)
    skillsObject.otherSkills = otherSkills
      .split(',')
      .map((skill) => skill.trim());

  try {
    // Check that the user is associated with the profile the addition is being made to
    if (req.user.profileId === profile) {
      const skills = new Skill(skillsObject);
      await skills.save();
      return res.status(201).json(skills);
    } else {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete all skills
// @route DELETE /api/skills
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

// @desc  Delete a skill
// @route DELETE /api/skills/:id
// @access Public
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (req.user.profileId === skill.profile.toString()) {
      await Skill.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: `Skill ${req.params.id} deleted` });
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
