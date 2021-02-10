const Education = require('../models/Education');
const Profile = require('../models/Profile');

// @desc  Get all education
// @route GET /api/educations
// @access Users
exports.getAllEducation = async (req, res) => {
  try {
    const education = await Education.find();
    education ? res.status(200).json(education) : res.status(404).json({ msg: 'No education found'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Add an education
// @route POST /api/educations
// @access Users
exports.addEducation = async (req, res) => {
  const {
    profile,
    school,
    degree,
    major,
    minors,
    from,
    to,
    current,
    description,
  } = req.body;

  // Object for saving
  const educationObject = {};
  if (profile) educationObject.profile = profile;
  if (school) educationObject.school = school;
  if (degree) educationObject.degree = degree;
  if (major) educationObject.major = major;
  if (minors) educationObject.minors = minors;
  if (from) educationObject.from = from;
  if (to) educationObject.to = to;
  if (current) educationObject.current = current;
  if (description) educationObject.description = description;

  try {
    // Check that the user is associated with the profile the addition is being made to
    if (req.user.profileId === profile) {
      const education = new Education(educationObject);
      await education.save();
      return res.status(201).json(education);
    } else {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete all education
// @route DELETE /api/educations
// @access Admin
exports.deleteEducations = async (req, res) => {
  try {
    await Education.deleteMany();
    res.status(200).json({ msg: 'All Education Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete an education
// @route DELETE /api/educations/:id
// @access Users
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) {
      return res.status(404).json({ msg: `Education ${req.params.id} not found`});
    }
    if (req.user.profileId === education.profile.toString()) {
      await Education.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: `Education ${req.params.id} deleted` });
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    err.kind === 'ObjectId' ? res.status(400).json({ msg: `id ${req.params.id} is invalid`}) : res.status(500).send('Server Error');
  }
};
