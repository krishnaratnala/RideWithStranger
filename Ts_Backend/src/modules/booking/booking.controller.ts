import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import * as bookingService from './booking.service';

export const createBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
):Promise<void> => {
  try {
    const booking = await bookingService.createBooking({
      partnerId: req.user!.userId,
      riderId: req.body.riderId,
      pickupLocation: req.body.pickupLocation,
      dropLocation: req.body.dropLocation,
      distanceKm: req.body.distanceKm,
      basePrice: req.body.basePrice,
      minPrice: req.body.minPrice,
    });

    res.status(201).json({
      message: 'Booking request sent',
      booking,
    });
  } catch (err) {
    next(err);
  }
};

export const acceptBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await bookingService.acceptBooking(
      req.params.id,
      req.user!.userId
    );

    res.status(200).json({
      message: 'Booking accepted',
      booking,
    });
  } catch (err) {
    next(err);
  }
};

export const rejectBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await bookingService.rejectBooking(
      req.params.id,
      req.user!.userId
    );

    res.status(200).json({
      message: 'Booking rejected',
      booking,
    });
  } catch (err) {
    next(err);
  }
};

export const agreePrice = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);

    if (req.body.price < booking.min_price) {
      return res.status(400).json({
        message: 'Price below minimum fare is not allowed',
      });
    }

    const updatedBooking = await bookingService.updateFinalPrice(
      req.params.id,
      req.body.price
    );

    res.status(200).json({
      message: 'Price agreed successfully',
      booking: updatedBooking,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyBookings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings = await bookingService.listBookingsByUser(
      req.user!.userId,
      req.user!.role
    );

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};
