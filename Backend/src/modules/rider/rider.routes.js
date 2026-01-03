const express = require('express');
const router = express.Router();
const riderController = require('./rider.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

/**
 * @swagger
 * tags:
 *   name: Rider
 *   description: Rider profile APIs
 */

/**
 * @swagger
 * /api/rider/me:
 *   get:
 *     summary: Get logged-in rider profile
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rider profile
 */
router.get(
  '/me',
  authMiddleware,
  roleMiddleware('RIDER'),
  riderController.getMyProfile
);

/**
 * @swagger
 * /api/rider/me:
 *   post:
 *     summary: Create rider profile
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - vehicle_number
 *               - license_number
 *               - bike_rc_image
 *               - government_id_image
 *               - bike_image
 *             properties:
 *               vehicle_number:
 *                 type: string
 *               license_number:
 *                 type: string
 *               bike_rc_image:
 *                 type: string
 *               government_id_image:
 *                 type: string
 *               bike_image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rider profile created
 */
router.post(
  '/me',
  authMiddleware,
  roleMiddleware('RIDER'),
  riderController.createProfile
);

/**
 * @swagger
 * /api/rider/me:
 *   put:
 *     summary: Update rider availability
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               availability:
 *                 type: string
 *                 enum: [AVAILABLE, BUSY, OFFLINE]
 *     responses:
 *       200:
 *         description: Rider profile updated
 */
router.put(
  '/me',
  authMiddleware,
  roleMiddleware('RIDER'),
  riderController.updateAvailability
);

/**
 * @swagger
 * /api/rider/location:
 *   post:
 *     summary: Update rider live location
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [latitude, longitude]
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Location updated
 */
router.post(
  '/location',
  authMiddleware,
  roleMiddleware('RIDER'),
  riderController.updateLocation
);

module.exports = router;
