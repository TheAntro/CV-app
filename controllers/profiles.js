const Profile = require('../models/Profile');

// @desc  Get all profiles
// @route GET /api/profiles
// @access Public
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    profiles ? res.status(200).json(profiles) : res.status(404).json({ msg: 'No profiles found'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Get profile by id
// @route GET /api/profiles/:id
// @access Public
exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate(
      'skill experience education reference'
    );
    profile ? res.status(200).json(profile) : res.status(404).json({ msg: 'Profile not found'});
    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    err.kind === 'ObjectId' ? res.status(400).json({ msg: `id ${req.params.id} is invalid`}) : res.status(500).send('Server Error');
  }
};

// @desc  Add or update a profile
// @route POST /api/profiles
// @access Users
exports.createProfile = async (req, res) => {
  const {
    name,
    street,
    zipcode,
    city,
    email,
    phone,
    linkedin,
    github,
    scholar,
  } = req.body;

  // Check that the api user is creating a profile for themselves, or is an admin
  if (!(req.user.email === email || req.user.role === 'admin')) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  // Profile object
  const profileObject = {};
  profileObject.address = {};
  profileObject.social = {};
  if (name) profileObject.name = name;
  if (street) profileObject.address.street = street;
  if (zipcode) profileObject.address.zipcode = zipcode;
  if (city) profileObject.address.city = city;
  if (email) profileObject.email = email;
  if (phone) profileObject.phone = phone;
  if (linkedin) profileObject.social.linkedin = linkedin;
  if (github) profileObject.social.github = github;
  if (scholar) profileObject.social.scholar = scholar;

  try {
    let profile = await Profile.findById(req.body.id);
    if (profile) {
      //Update existing profile
      profile = await Profile.findByIdAndUpdate(
        { _id: req.body.id },
        { $set: profileObject },
        { new: true }
      );

      return res.status(200).json(profile);
    }

    profile = new Profile(profileObject);
    await profile.save();
    return res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete a profile
// @route DELETE /api/profiles/:id
// @access Users
exports.deleteProfile = async (req, res) => {
  try {
    if (req.user.profileId === req.params.id) {
      const removed = await Profile.findByIdAndRemove(req.params.id);
      removed ? res.status(200).json({ msg: `Profile ${req.params.id} deleted` }): res.status(404).json({ msg: 'Profile not found'});
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    err.kind === 'ObjectId' ? res.status(400).json({ msg: `id ${req.params.id} is not valid`}) : res.status(500).send('Server Error');
  }
};
