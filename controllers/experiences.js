const Experience = require('../models/Experience');

// @desc  Get all experience
// @route GET /api/experiences
// @access Public
exports.getAllExperience = async (req, res) => {
  try {
    const experience = await Experience.find();
    res.status(200).json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Add an experience
// @route POST /api/experiences
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
    description,
  } = req.body;

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
    // Check that the user is associated with the profile the addition is being made to
    if (req.user.profileId === profile) {
      const experience = new Experience(experienceObject);
      await experience.save();
      return res.status(201).json(experience);
    } else {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete all experiences
// @route DELETE /api/experiences
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
// @route DELETE /api/experiences/:id
// @access Public
exports.deleteExperience = async (req, res) => {
  try {
    // Check that the user is associated with the profile the change is being made to
    const experience = await Experience.findById(req.params.id);
    if (req.user.profileId === education.profile.toString()) {
      await Experience.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: `Experience ${req.params.id} deleted` });
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
