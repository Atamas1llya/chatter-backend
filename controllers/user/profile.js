export const getProfile = (req, res, next) => {
  res
    .status(200)
    .json({ profile: req.user });
};
