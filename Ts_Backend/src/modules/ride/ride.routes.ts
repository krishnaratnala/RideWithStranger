import { Router } from 'express';
import * as rideController from './ride.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Ride
 *   description: Ride lifecycle APIs
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/rides/{bookingId}/start:
 *   patch:
 *     summary: Start the ride (Rider)
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride started successfully
 */
router.patch('/:bookingId/start', rideController.startRide);

/**
 * @swagger
 * /api/rides/{bookingId}/complete:
 *   patch:
 *     summary: Complete the ride (Rider)
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride completed successfully
 */
router.patch('/:bookingId/complete', rideController.completeRide);

/**
 * @swagger
 * /api/rides/{bookingId}/rate:
 *   post:
 *     summary: Rate a ride (Partner)
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: Smooth and safe ride
 *     responses:
 *       200:
 *         description: Ride rated successfully
 */
router.post('/:bookingId/rate', rideController.rateRide);

/**
 * @swagger
 * /api/rides/{bookingId}:
 *   get:
 *     summary: Get ride details
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride details fetched successfully
 */
router.get('/:bookingId', rideController.getRideDetails);

export default router;
