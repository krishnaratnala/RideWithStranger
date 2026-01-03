const express = require('express');
const router = express.Router();
const partnerController = require('./partner.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const roleMiddleware = require('../../middlewares/role.middleware');

/**
 * @swagger
 * tags:
 *   name: Partner
 *   description: Partner profile APIs
 */

/**
 * @swagger
 * /api/partner/me:
 *   get:
 *     summary: Get logged-in partner profile
 *     tags: [Partner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Partner profile
 */
router.get(
  '/me',
  authMiddleware,
  roleMiddleware('PARTNER'),
  partnerController.getMyProfile
);

/**
 * @swagger
 * /api/partner/me:
 *   post:
 *     summary: Create partner profile
 *     tags: [Partner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       201:
 *         description: Partner profile created
 */
router.post(
  '/me',
  authMiddleware,
  roleMiddleware('PARTNER'),
  partnerController.createProfile
);

/**
 * @swagger
 * /api/partner/me:
 *   put:
 *     summary: Update partner profile
 *     tags: [Partner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *     responses:
 *       200:
 *         description: Partner profile updated
 */
router.put(
  '/me',
  authMiddleware,
  roleMiddleware('PARTNER'),
  partnerController.updateProfile
);

module.exports = router;
