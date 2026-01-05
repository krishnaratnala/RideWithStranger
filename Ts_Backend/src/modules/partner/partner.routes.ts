import { Router } from 'express';
import * as partnerController from './partner.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { roleMiddleware } from '../../middlewares/role.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Partner
 *   description: Partner management APIs
 */

router.use(authMiddleware, roleMiddleware('PARTNER'));

/**
 * @swagger
 * /api/partners/profile:
 *   get:
 *     summary: Get partner profile
 *     tags: [Partner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Partner profile details
 *       403:
 *         description: Unauthorized access
 */
router.get('/profile', partnerController.getProfile);

/**
 * @swagger
 * /api/partners/profile:
 *   put:
 *     summary: Update partner profile
 *     tags: [Partner]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               default_location:
 *                 type: string
 *               wallet_balance:
 *                 type: number
 *     responses:
 *       200:
 *         description: Partner profile updated
 */
router.put('/profile', partnerController.updateProfile);

/**
 * @swagger
 * /api/partners/wallet:
 *   get:
 *     summary: Get wallet balance
 *     tags: [Partner]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Wallet balance
 */
router.get('/wallet', partnerController.getWallet);

export default router;
