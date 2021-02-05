const Education = require('../models/Education');

// @desc  Get all education
// @route GET /api/education
// @access Public
exports.getAllEducation = async (req, res) =>  {
  try {
    const education = await Education.find();
    res.status(200).json(education);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// @desc  Add an experience
// @route POST /api/experience
// @access Public
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
    description
  } = req.body;

  // Profile object
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
    const education = new Education(educationObject);
    await education.save();
    return res.status(201).json(education);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// @desc  Delete all education
// @route DELETE /api/education
// @access Public
exports.deleteEducations = async (req, res) => {
  try {
    await Education.deleteMany();
    res.status(200).json({ msg: 'All Education Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete a education
// @route DELETE /api/education/:id
// @access Public
exports.deleteEducation = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `Education ${req.params.id} deleted` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
