const service = require('./booking.service');

exports.createBooking = async (req, res) => {
  const booking = await service.create(req.body);
  res.status(201).json(booking);
};
