const partnerService = require('./partner.service');

exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await partnerService.getByUserId(req.user.userId);
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

exports.createProfile = async (req, res, next) => {
  try {
    const profile = await partnerService.create(
      req.user.userId,
      req.body
    );
    res.status(201).json({
      message: 'Partner profile created',
      profile,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const profile = await partnerService.update(
      req.user.userId,
      req.body
    );
    res.status(200).json({
      message: 'Partner profile updated',
      profile,
    });
  } catch (err) {
    next(err);
  }
};
