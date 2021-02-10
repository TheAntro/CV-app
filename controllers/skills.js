const Skill = require('../models/Skill');

// @desc  Get skills associated with the user, or all skills if the user is an admin
// @route GET /api/skills
// @access Users
exports.getSkills = async (req, res) => {
  try {
    let skills = await Skill.find();
    if (req.user.role !== 'admin') {
      skills = skills.filter(skill => skill.profile === req.user.profileId);
    }
    skills.length !== 0 ? res.status(200).json(skills) : res.status(404).json({ msg: 'No skills found'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Add a skill
// @route POST /api/skills
// @access Users
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
// @access Admin
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
// @access Users
exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ msg: `Skill ${req.params.id} not found`});
    }
    if (req.user.profileId === skill.profile.toString()) {
      await Skill.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: `Skill ${req.params.id} deleted` });
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    err.kind === 'ObjectId' ? res.status(400).json({ msg: `id ${req.params.id} is invalid`}) : res.status(500).send('Server Error');
  }
};
