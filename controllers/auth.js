import jwt from 'jsonwebtoken';
import { secret } from '../config.secure';

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
