const express = require('express');
const router = express.Router();
const rideController = require('./ride.controller');
const authMiddleware = require('../../middlewares/auth.middleware');

/**
 * @swagger
 * tags:
 *   name: Ride
 *   description: Ride lifecycle APIs
 */

/**
 * @swagger
 * /api/ride/start:
 *   post:
 *     summary: Start a ride after price confirmation
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [bookingId, finalPrice]
 *             properties:
 *               bookingId:
 *                 type: string
 *               finalPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ride started
 */
router.post('/start', authMiddleware, rideController.startRide);

/**
 * @swagger
 * /api/ride/{rideId}/complete:
 *   patch:
 *     summary: Complete a ride
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride completed
 */
router.patch('/:rideId/complete', authMiddleware, rideController.completeRide);

/**
 * @swagger
 * /api/ride/{rideId}:
 *   get:
 *     summary: Get ride details
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: rideId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride details
 */
router.get('/:rideId', authMiddleware, rideController.getRideById);

module.exports = router;
