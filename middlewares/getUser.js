import * as userService from '../services/user';

export const getUserByToken = token => userService.getUserByToken(token);

export default async (req, res, next) => {
  const { token } = req;
  let user;

  try {
    user = await userService.getUserByToken(token);
  } catch ({ message }) {
    return next({
      status: 500,
      message,
    });
  }

  req.user = user;
  next();
};
