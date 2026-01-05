import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import * as rideService from './ride.service';

export const startRide = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ride = await rideService.startRide(req.params.bookingId, req.user!.userId);
    res.status(200).json({ message: 'Ride started', ride });
  } catch (err) {
    next(err);
  }
};

export const completeRide = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ride = await rideService.completeRide(req.params.bookingId, req.user!.userId);
    res.status(200).json({ message: 'Ride completed', ride });
  } catch (err) {
    next(err);
  }
};

export const rateRide = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rating, review } = req.body;
    const rated = await rideService.rateRide(req.params.bookingId, req.user!.userId, rating, review);
    res.status(200).json({ message: 'Ride rated successfully', rated });
  } catch (err) {
    next(err);
  }
};

export const getRideDetails = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const ride = await rideService.getRideDetails(req.params.bookingId);
    res.status(200).json(ride);
  } catch (err) {
    next(err);
  }
};
