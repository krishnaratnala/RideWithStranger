const userService = require('./user.service');

exports.getMyProfile = async (req, res, next) => {
  try {
    const user = await userService.getById(req.user.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateMyProfile = async (req, res, next) => {
  try {
    const updatedUser = await userService.update(
      req.user.userId,
      req.body
    );
    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
