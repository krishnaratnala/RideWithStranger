const riderService = require('./rider.service');

exports.getMyProfile = async (req, res, next) => {
  try {
    const profile = await riderService.getByUserId(req.user.userId);
    res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};

exports.createProfile = async (req, res, next) => {
  try {
    const profile = await riderService.create(
      req.user.userId,
      req.body
    );

    res.status(201).json({
      message: 'Rider profile created successfully',
      profile,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAvailability = async (req, res, next) => {
  try {
    const profile = await riderService.updateAvailability(
      req.user.userId,
      req.body.availability
    );

    res.status(200).json({
      message: 'Availability updated',
      profile,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateLocation = async (req, res, next) => {
  try {
    await riderService.updateLocation(
      req.user.userId,
      req.body
    );

    res.status(200).json({
      message: 'Location updated successfully',
    });
  } catch (err) {
    next(err);
  }
};
