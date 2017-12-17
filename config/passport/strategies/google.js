import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../../../models/user';

import { googleClientId, googleClientSecret } from '../../../config.secure';

passport.use('google', new GoogleStrategy({
  clientID: googleClientId,
  clientSecret: googleClientSecret,
  callbackURL: 'http://127.0.0.1:8081/api/login/google/callback',
}, (accessToken, refreshToken, profile, cb) => {
  User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
}));
