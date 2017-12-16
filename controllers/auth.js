import passport from 'passport';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { secret } from '../config.secure';


export const registerLocal = async (req, res, next) => {
  const { email, password } = req.body;
  let user;
  let token;

  try {
    user = new User({
      local: { email, password },
    });

    await user.save();
    token = await jwt.sign({ _id: user._id }, secret);
  } catch (e) {
    return next({
      status: 400,
      message: e.message,
    });
  }

  res
    .status(200)
    .json({
      message: 'You\'re successfully registered!',
      token,
      profile: user,
    });
};


export const handleLoginSuccess = async (req, res, next) => {
  const { user } = req;
  const { mode } = req.body;
  let token;

  try {
    token = await jwt.sign({ _id: user._id }, secret);
  } catch ({ message }) {
    return next({
      status: 403,
      message,
    });
  }

  if (mode === 'inline') {
    res
      .status(200)
      .json({
        token,
        profile: user,
      });
  } else {
    res
      .status(200)
      .redirect(`http://localhost:8080/login/success?auth_token=${token}`);
  }
};
