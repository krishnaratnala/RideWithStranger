import { Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import * as partnerService from './partner.service';

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const partner = await partnerService.getPartnerProfile(req.user!.userId);
    res.status(200).json(partner);
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
    const partner = await partnerService.updatePartnerProfile(
      req.user!.userId,
      req.body
    );

    res.status(200).json({
      message: 'Partner profile updated',
      partner,
    });
  } catch (err) {
    next(err);
  }
};

export const getWallet = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const wallet = await partnerService.getWalletBalance(req.user!.userId);
    res.status(200).json(wallet);
  } catch (err) {
    next(err);
  }
};
