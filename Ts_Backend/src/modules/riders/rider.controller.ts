import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import * as riderService from './rider.service';

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const rider = await riderService.getRiderProfile(req.user!.userId);
    res.status(200).json(rider);
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const rider = await riderService.updateRiderProfile(
      req.user!.userId,
      req.body
    );

    res.status(200).json({
      message: 'Rider profile updated',
      rider,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAvailability = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const rider = await riderService.setRiderAvailability(
      req.user!.userId,
      req.body.is_available
    );

    res.status(200).json({
      message: 'Availability updated',
      rider,
    });
  } catch (err) {
    next(err);
  }
};
