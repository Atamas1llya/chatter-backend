import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../../../models/user';

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, email, password, done) => {
  let user;

  try {
    user = await User.findOne({ 'local.email': email });
    if (!user) {
      user = await User.create({
        'local.email': email,
        'local.password': password,
        'global.username': email.split('@')[0],
      });
    } else {
      await user.comparePassword(password);
    }
  } catch (err) {
    return done(err);
  }

  return done(null, user);
}));
