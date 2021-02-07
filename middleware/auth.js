const User = require('../models/User');

exports.protect = async function (req, res, next) {
  // decode email and password from auth header
  let [email, password] = new Buffer.from(
    req.headers.authorization.split(' ')[1],
    'base64'
  )
    .toString()
    .split(':');
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      next();
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
