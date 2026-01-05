import { Router } from 'express';
import * as bookingController from './booking.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Ride booking & bargaining APIs
 */

router.use(authMiddleware);

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking (Partner)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - riderId
 *               - pickupLocation
 *               - dropLocation
 *               - distanceKm
 *               - basePrice
 *               - minPrice
 *             properties:
 *               riderId:
 *                 type: string
 *               pickupLocation:
 *                 type: string
 *               dropLocation:
 *                 type: string
 *               distanceKm:
 *                 type: number
 *               basePrice:
 *                 type: number
 *               minPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking request sent
 */
router.post('/', bookingController.createBooking);

/**
 * @swagger
 * /api/bookings/{id}/accept:
 *   patch:
 *     summary: Accept booking (Rider)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking accepted
 */
router.patch('/:id/accept', bookingController.acceptBooking);

/**
 * @swagger
 * /api/bookings/{id}/reject:
 *   patch:
 *     summary: Reject booking (Rider)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking rejected
 */
router.patch('/:id/reject', bookingController.rejectBooking);

/**
 * @swagger
 * /api/bookings/{id}/agree-price:
 *   patch:
 *     summary: Agree on final price (Partner or Rider)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - price
 *             properties:
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Price agreed successfully
 *       400:
 *         description: Price below minimum fare
 */
router.patch('/:id/agree-price', bookingController.agreePrice);

/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     summary: Get my bookings (Partner or Rider)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/my', bookingController.getMyBookings);

export default router;
