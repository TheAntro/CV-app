const Experience = require('../models/Experience');

// @desc  Get all experience
// @route GET /api/experience
// @access Public
exports.getAllExperience = async (req, res) =>  {
  try {
    const experience = await Experience.find();
    res.status(200).json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// @desc  Add an experience
// @route POST /api/experience
// @access Public
exports.addExperience = async (req, res) => {
  const {
    profile,
    company,
    title,
    location,
    from,
    to,
    current,
    description
  } = req.body;

  // Profile object
  const experienceObject = {};
  if (profile) experienceObject.profile = profile;
  if (company) experienceObject.company = company;
  if (title) experienceObject.title = title;
  if (location) experienceObject.location = location;
  if (from) experienceObject.from = from;
  if (to) experienceObject.to = to;
  if (current) experienceObject.current = current;
  if (description) experienceObject.description = description;

  try {
    const experience = new Experience(experienceObject);
    await experience.save();
    return res.status(201).json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// @desc  Delete all experiences
// @route DELETE /api/experience
// @access Public
exports.deleteExperiences = async (req, res) => {
  try {
    await Experience.deleteMany();
    res.status(200).json({ msg: 'All Experiences Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete an experience
// @route DELETE /api/experience/:id
// @access Public
exports.deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: `Experience ${req.params.id} deleted` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
