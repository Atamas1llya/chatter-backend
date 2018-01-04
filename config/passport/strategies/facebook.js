import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from '../../../models/user';
import { facebookAppId, facebookAppSecret } from '../../../config.secure';

passport.use('facebook', new FacebookStrategy({
  clientID: facebookAppId,
  clientSecret: facebookAppSecret,
  callbackURL: 'http://127.0.0.1:8081/api/login/facebook/callback',
}, async (accessToken, refreshToken, profile, cb) => {
  let user;

  try {
    user = await User.findOne({ 'facebook.id': profile.id }).lean();

    if (!user) {
      user = new User({
        'facebook.id': profile.id,
        'global.username': profile.displayName,
      });

      await user.save();
    }
  } catch (err) {
    cb(err, null);
  }

  cb(null, user);
}));
