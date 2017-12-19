import jwt from 'jsonwebtoken';
import { secret } from '../config.secure';

export const checkToken = token => jwt.verify(token, secret);

export default async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    var tokenObject = await jwt.verify(token, secret);
    console.log(tokenObject);
  } catch (err) {
    return next({
      status: 403,
      message: 'Invalid token',
    });
  }

  req.token = tokenObject;
  next();
};
