import passport from 'passport';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import { twitterConsumerKey, twitterApiSecret } from '../../../config.secure';

import User from '../../../models/user';

passport.use('twitter', new TwitterStrategy({
  consumerKey: twitterConsumerKey,
  consumerSecret: twitterApiSecret,
  callbackURL: 'http://127.0.0.1:8081/api/login/twitter/callback',
}, (token, tokenSecret, profile, cb) => {
  User.findOrCreate({ 'twitter.id': profile.id }, (err, user) => cb(err, user));
}));
