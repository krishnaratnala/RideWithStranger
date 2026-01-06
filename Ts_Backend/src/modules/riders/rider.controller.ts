import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { MulterRequest } from '../../types/multer-request';
import * as riderService from './rider.service';

export const riderController = {
  async updateProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authReq = req as AuthRequest & MulterRequest;

      const userId = authReq.user!.userId;

      const body = authReq.body as {
        vehicle_number?: string;
        license_number?: string;
        vehicle_type?: string;
      };

      const files =
        authReq.files && !Array.isArray(authReq.files)
          ? authReq.files
          : undefined;

      const rider = await riderService.riderService.updateRiderProfile(userId, {
        vehicle_number: body.vehicle_number,
        license_number: body.license_number,
        vehicle_type: body.vehicle_type,
        rc_image: files?.rc_image?.[0]?.filename,
        government_proof_image:
          files?.government_proof_image?.[0]?.filename,
        bike_image: files?.bike_image?.[0]?.filename,
      });

      res.status(200).json({
        message: 'Rider profile updated successfully',
        rider,
      });
    } catch (error) {
      next(error);
    }
  },

  async getProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const rider = await riderService.getRiderProfile(req.user!.userId);
      res.status(200).json(rider);
    } catch (err) {
      next(err);
    }
  },

  async updateAvailability(req: AuthRequest, res: Response, next: NextFunction) {
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
  },
};
