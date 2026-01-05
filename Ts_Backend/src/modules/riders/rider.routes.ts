import { Router } from 'express';
import * as riderController from './rider.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rider
 *   description: Rider management APIs
 */

router.use(authMiddleware, roleMiddleware('RIDER'));

/**
 * @swagger
 * /api/riders/profile:
 *   get:
 *     summary: Get rider profile
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rider profile fetched successfully
 */
router.get('/profile', riderController.getProfile);

/**
 * @swagger
 * /api/riders/profile:
 *   put:
 *     summary: Update rider profile
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: John Doe
 *               phone: "9876543210"
 *     responses:
 *       200:
 *         description: Rider profile updated successfully
 */
router.put('/profile', riderController.updateProfile);

/**
 * @swagger
 * /api/riders/availability:
 *   patch:
 *     summary: Update rider availability
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_available
 *             properties:
 *               is_available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Rider availability updated successfully
 */
router.patch('/availability', riderController.updateAvailability);

export default router;
