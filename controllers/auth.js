import passport from 'passport';
import User from '../models/user';

export const registerLocal = async (req, res, next) => {
  const { phone, password } = req.body;
  let user;

  try {
    user = new User({
      local: { phone, password },
    });

    await user.save();
  } catch ({ message }) {
    return next({
      status: 400,
      message,
    });
  }

  res
    .status(200)
    .json({
      message: 'You\'re successfully registered!',
    })
}

export const handleLoginSuccess = async (req, res, next) => {
  const { user } = req;

  try {
    console.log(user);
  } catch (e) {

  }

  res
    .status(200)
    .redirect('http://localhost:8080/login/success/token-here');
}
