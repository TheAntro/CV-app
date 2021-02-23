const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Profile = require('../models/Profile');

// @desc Authorizes the api use by checking that Basic Auth credentials are valid.
//       Adds user details into req.user for easy access
exports.authorize = async function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: 'Use Basic Auth' });
  }
  let [email, password] = new Buffer.from(
    req.headers.authorization.split(' ')[1],
    'base64'
  )
    .toString()
    .split(':');
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const profile = await Profile.findOne({ email });
      // add user details to request
      req.user = {};
      req.user.role = user.role;
      req.user.email = user.email;
      req.user.id = user.id;
      // User does not necessarily have a profile
      if (profile) req.user.profileId = profile.id;
      next();
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// @desc Checks that the user has the role based authorization to access the resource.
//       Requires authorize middleware to set req.user header
exports.hasRole = (...roles) => {
  return async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({ msg: 'Unauthorized' });
    }
  };
};
