const Reference = require('../models/Reference');

// @desc  Get all references
// @route GET /api/references
// @access Users
exports.getReferences = async (req, res) => {
  try {
    let references = await Reference.find();
    if (req.user.role !== 'admin') {
      references = references.filter(reference => reference.profile === req.user.profileId);
    }
    references.length > 0 ? res.status(200).json({data: references}) : res.status(404).json({ msg: 'No references found'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Add a reference
// @route POST /api/references
// @access Users
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
      return res.status(201).json({data: reference});
    } else {
      res.status(403).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc  Delete all references
// @route DELETE /api/references
// @access Admin
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
// @access Users
exports.deleteReference = async (req, res) => {
  try {
    const reference = await Reference.findById(req.params.id);
    if (!reference) {
      return res.status(404).json({ msg: `Reference ${req.params.id} not found`});
    }
    if (req.user.profileId === reference.profile.toString()) {
      await Reference.findByIdAndDelete(req.params.id);
      res.status(200).json({ msg: `Reference ${req.params.id} deleted` });
    } else {
      res.status(403).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
