import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import { twitterConsumerKey, twitterApiSecret } from '../../../config.secure';

import User from '../../../models/user';

passport.use('twitter', new TwitterStrategy({
  consumerKey: twitterConsumerKey,
  consumerSecret: twitterApiSecret,
  callbackURL: 'http://127.0.0.1:8081/api/login/twitter/callback',
}, async (token, tokenSecret, profile, cb) => {
  let user;

  try {
    user = await User.findOne({ 'twitter.id': profile.id }).lean();

    if (!user) {
      user = new User({
        'twitter.id': profile.id,
        'global.username': profile.username,
        'global.bio': profile._json.description,
      });

      await user.save();
    }
  } catch (err) {
    cb(err, null);
  }

  cb(null, user);
}));
