import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../../../models/user';

import { googleClientId, googleClientSecret } from '../../../config.secure';

passport.use('google', new GoogleStrategy({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: 'http://127.0.0.1:8081/api/login/google/callback',
}, async (accessToken, refreshToken, profile, cb) => {
  let user;

  try {
    user = await User.findOne({ 'google.id': profile.id }).lean();

    if (!user) {
      user = new User({
        'google.id': profile.id,
        'global.username': profile.displayName,
      });

      await user.save();
    }
  } catch (err) {
    cb(err, null);
  }

  cb(null, user);
}));
