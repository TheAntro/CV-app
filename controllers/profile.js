const Profile = require('../models/Profile');

// @desc  Get full profile
// @route GET /api/profile
// @access Public
exports.getProfile = async (req, res) =>  {
  try {
    const profile = await Profile.find();
    res.status(200).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// @desc  Add or update a profile
// @route POST /api/profile
// @access Public
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
        { new: true },
      );

      return res.status(200).json(profile)
    }

    profile = new Profile(profileObject);
    await profile.save();
    return res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// @desc  Delete profile
// @route DELETE /api/profile
// @access Public
exports.deleteProfile = async (req, res) =>  {
  try {
    await Profile.findByIdAndRemove(req.body.id);
    res.status(200).json({ msg: 'Profile deleted'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}