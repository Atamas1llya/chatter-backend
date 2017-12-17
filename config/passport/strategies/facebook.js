import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';

import User from '../../../models/user';
import { facebookAppId, facebookAppSecret } from '../../../config.secure';

passport.use('facebook', new FacebookStrategy({
    clientID: facebookAppId,
    clientSecret: facebookAppSecret,
    callbackURL: "http://127.0.0.1:8081/api/login/facebook/callback"
  }, (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ 'facebook.id': profile.id }, (err, user) => cb(err, user));
}))
