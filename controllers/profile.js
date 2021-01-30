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

// @desc  Add a profile
// @route POST /api/profile
// @access Public
/* Not in use: not necessary to add more profiles at this point,
If taken back to use, reapply to the route file.
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
    const profile = new Profile(profileObject);
    await profile.save();
    return res.status(201).json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}
*/