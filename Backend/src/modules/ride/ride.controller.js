const rideService = require('./ride.service');

exports.startRide = async (req, res, next) => {
  try {
    const ride = await rideService.startRide({
      bookingId: req.body.bookingId,
      finalPrice: req.body.finalPrice,
      userId: req.user.userId,
    });

    res.status(201).json({
      message: 'Ride started successfully',
      ride,
    });
  } catch (err) {
    next(err);
  }
};

exports.completeRide = async (req, res, next) => {
  try {
    const ride = await rideService.completeRide(
      req.params.rideId,
      req.user.userId
    );

    res.status(200).json({
      message: 'Ride completed successfully',
      ride,
    });
  } catch (err) {
    next(err);
  }
};

exports.getRideById = async (req, res, next) => {
  try {
    const ride = await rideService.getRideById(req.params.rideId);
    res.status(200).json(ride);
  } catch (err) {
    next(err);
  }
};
