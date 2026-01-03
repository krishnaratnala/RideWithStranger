const express = require('express');
const router = express.Router();
const controller = require('./booking.controller');

/**
 * @swagger
 * /api/booking:
 *   post:
 *     summary: Create booking
 *     tags: [Booking]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               partnerId:
 *                 type: string
 *               riderId:
 *                 type: string
 *               distanceKm:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/', controller.createBooking);

module.exports = router;
