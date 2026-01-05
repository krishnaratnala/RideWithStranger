import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import * as userService from './user.service';

export const getMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await userService.getUserById(req.user.userId);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const updateMe = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await userService.updateUser(req.user.userId, req.body);
    res.status(200).json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (err) {
    next(err);
  }
};
