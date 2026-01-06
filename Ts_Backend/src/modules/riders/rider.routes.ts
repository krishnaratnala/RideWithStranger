import { Router } from 'express';
import { riderController } from './rider.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';
import { upload } from '../../middlewares/upload.middleware';

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
 * /api/rider/profile:
 *   put:
 *     summary: Update rider profile and upload documents
 *     description: Update rider vehicle details and upload required documents
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               vehicle_number:
 *                 type: string
 *                 example: TS09AB1234
 *               license_number:
 *                 type: string
 *                 example: DL-0420110149646
 *               vehicle_type:
 *                 type: string
 *                 example: BIKE
 *               rc_image:
 *                 type: string
 *                 format: binary
 *               government_proof_image:
 *                 type: string
 *                 format: binary
 *               bike_image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Rider profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Rider profile updated successfully
 *                 rider:
 *                   type: object
 */
router.put(
  '/profile',
  upload.fields([
    { name: 'rc_image', maxCount: 1 },
    { name: 'government_proof_image', maxCount: 1 },
    { name: 'bike_image', maxCount: 1 },
  ]),
  riderController.updateProfile
);

/**
 * @swagger
 * /api/rider/profile:
 *   get:
 *     summary: Get rider profile
 *     description: Fetch logged-in rider profile details
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rider profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/profile', riderController.getProfile);

/**
 * @swagger
 * /api/rider/availability:
 *   patch:
 *     summary: Update rider availability
 *     description: Mark rider as available or unavailable
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.patch('/availability', riderController.updateAvailability);

export default router;
