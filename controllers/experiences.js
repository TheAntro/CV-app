const Experience = require('../models/Experience');

// @desc  Get all experience
// @route GET /api/experiences
// @access Users
exports.getAllExperience = async (req, res) => {
  try {
    const experience = await Experience.find();
    if (req.user.role !== 'admin') {
      experience = experience.filter(experience => experience.profile === req.user.profileId);
    }
    experience.length > 0 ? res.status(200).json(experience) : res.status(404).json({ msg: 'No experience found'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Add an experience
// @route POST /api/experiences
// @access Users
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
      return res.status(403).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete all experiences
// @route DELETE /api/experiences
// @access Admin
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
// @access Users
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ msg: `Experience ${req.params.id} not found`});
    }
    // Check that the user is associated with the profile the change is being made to
    if (req.user.profileId === experience.profile.toString()) {
      await Experience.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: `Experience ${req.params.id} deleted` });
    } else {
      res.status(403).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    err.kind === 'ObjectId' ? res.status(400).json({ msg: `id ${req.params.id} is invalid`}) : res.status(500).send('Server Error');
  }
};
