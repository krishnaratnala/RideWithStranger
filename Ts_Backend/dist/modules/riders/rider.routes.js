"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rider_controller_1 = require("./rider.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const upload_middleware_1 = require("../../middlewares/upload.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Rider
 *   description: Rider management APIs
 */
router.use(auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)('RIDER'));
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
router.put('/profile', upload_middleware_1.upload.fields([
    { name: 'rc_image', maxCount: 1 },
    { name: 'government_proof_image', maxCount: 1 },
    { name: 'bike_image', maxCount: 1 },
]), rider_controller_1.riderController.updateProfile);
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
router.get('/profile', rider_controller_1.riderController.getProfile);
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
router.patch('/availability', rider_controller_1.riderController.updateAvailability);
exports.default = router;
