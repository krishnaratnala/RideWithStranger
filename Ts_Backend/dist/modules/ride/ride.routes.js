"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rideController = __importStar(require("./ride.controller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Ride
 *   description: Ride lifecycle APIs
 */
router.use(auth_middleware_1.authMiddleware);
/**
 * @swagger
 * /api/rides/{bookingId}/start:
 *   patch:
 *     summary: Start the ride (Rider)
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride started successfully
 */
router.patch('/:bookingId/start', rideController.startRide);
/**
 * @swagger
 * /api/rides/{bookingId}/complete:
 *   patch:
 *     summary: Complete the ride (Rider)
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride completed successfully
 */
router.patch('/:bookingId/complete', rideController.completeRide);
/**
 * @swagger
 * /api/rides/{bookingId}/rate:
 *   post:
 *     summary: Rate a ride (Partner)
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
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
 *               - rating
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 5
 *               review:
 *                 type: string
 *                 example: Smooth and safe ride
 *     responses:
 *       200:
 *         description: Ride rated successfully
 */
router.post('/:bookingId/rate', rideController.rateRide);
/**
 * @swagger
 * /api/rides/{bookingId}:
 *   get:
 *     summary: Get ride details
 *     tags: [Ride]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ride details fetched successfully
 */
router.get('/:bookingId', rideController.getRideDetails);
exports.default = router;
