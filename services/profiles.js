const Profile = require('../models/Profile');

exports.getProfileByIdAndPopulate = async (id) => {
  const profile = await Profile.findById(id).populate(
    'skill experience education reference'
  );
  return profile;
};
