import { Router } from 'express';
import * as userController from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile APIs
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 userId: "123"
 *                 name: "John Doe"
 *                 email: "john@example.com"
 *                 profile_image: "https://example.com/image.jpg"
 */
router.get('/me', authMiddleware, userController.getMe);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update logged-in user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               profile_image:
 *                 type: string
 *                 example: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: "Profile updated successfully"
 *                 user:
 *                   userId: "123"
 *                   name: "John Doe"
 *                   email: "john@example.com"
 *                   profile_image: "https://example.com/image.jpg"
 */
router.put('/me', authMiddleware, userController.updateMe);

export default router;
