const Reference = require('../models/Reference');

// @desc  Get all references
// @route GET /api/reference
// @access Public
exports.getReferences = async (req, res) => {
  try {
    const references = await Reference.find();
    res.status(200).json(references);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Add a reference
// @route POST /api/reference
// @access Public
exports.addReference = async (req, res) => {
  const { profile, name, title, phone, email, company } = req.body;

  const referenceObject = {};
  if (profile) referenceObject.profile = profile;
  if (name) referenceObject.name = name;
  if (title) referenceObject.title = title;
  if (phone) referenceObject.phone = phone;
  if (email) referenceObject.email = email;
  if (company) referenceObject.company = company;

  try {
    const reference = new Reference(referenceObject);
    await reference.save();
    return res.status(201).json(reference);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
