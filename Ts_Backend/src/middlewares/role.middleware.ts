import { Response, NextFunction, RequestHandler } from 'express';
import { AuthRequest } from './auth.middleware';

export const roleMiddleware = (role: 'RIDER' | 'PARTNER'): RequestHandler => {
  return ((req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(403).json({ message: 'Forbidden: No user info' });
      return;
    }

    if (req.user.role !== role) {
      res
        .status(403)
        .json({ message: `Forbidden: Requires ${role} role` });
      return;
    }

    next();
  }) as RequestHandler;
};
