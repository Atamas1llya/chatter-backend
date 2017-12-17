import passport from 'passport';
import User from '../../models/user';

import './strategies/local';
import './strategies/twitter';
import './strategies/facebook';
import './strategies/google';

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((_id, cb) => {
  User.findById(_id, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});
