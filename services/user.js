import jwt from 'jsonwebtoken';
import User from '../models/user';

export const getUserByToken = (token) => {
  const { _id } = token;
  let user;

  try {
    user = User.find({ _id }, { password: 0 });
  } catch (err) {
    throw err;
  }

  return user;
};
