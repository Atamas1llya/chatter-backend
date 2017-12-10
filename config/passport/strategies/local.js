import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '../../../models/user';

passport.use(new LocalStrategy({
  usernameField: 'phone',
  passwordField: 'password',
  passReqToCallback: true,
}, async (req, phone, password, done) => {
  let user;

  try {
    user = await User.findOne({ 'local.phone': phone });
    if (!user) return done(null, false);

    await user.comparePassword(password);
  } catch (err) {
    console.log(err);
    return done(err);
  }

  return done(null, user);
}));
