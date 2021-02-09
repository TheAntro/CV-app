const Reference = require('../models/Reference');

// @desc  Get all references
// @route GET /api/references
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
// @route POST /api/references
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
    // Check that the user is associated with the profile the change is being made to
    if (req.user.profileId === profile) {
      const reference = new Reference(referenceObject);
      await reference.save();
      return res.status(201).json(reference);
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete all references
// @route DELETE /api/references
// @access Public
exports.deleteReferences = async (req, res) => {
  try {
    await Reference.deleteMany();
    res.status(200).json({ msg: 'All References Deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete a reference
// @route DELETE /api/references/:id
// @access Public
exports.deleteReference = async (req, res) => {
  try {
    // TODO: Check that the user is associated with the profile the addition is being made to
    const reference = await Reference.findById(req.params.id);
    if (req.user.profileId === reference.profile.toString()) {
      await Reference.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: `Reference ${req.params.id} deleted` });
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
