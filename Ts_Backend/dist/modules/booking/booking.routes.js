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
const bookingController = __importStar(require("./booking.controller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: Ride booking & bargaining APIs
 */
router.use(auth_middleware_1.authMiddleware);
/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking (Partner)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - riderId
 *               - pickupLocation
 *               - dropLocation
 *               - distanceKm
 *               - basePrice
 *               - minPrice
 *             properties:
 *               riderId:
 *                 type: string
 *               pickupLocation:
 *                 type: string
 *               dropLocation:
 *                 type: string
 *               distanceKm:
 *                 type: number
 *               basePrice:
 *                 type: number
 *               minPrice:
 *                 type: number
 *     responses:
 *       201:
 *         description: Booking request sent
 */
router.post('/', bookingController.createBooking);
/**
 * @swagger
 * /api/bookings/{id}/accept:
 *   patch:
 *     summary: Accept booking (Rider)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking accepted
 */
router.patch('/:id/accept', bookingController.acceptBooking);
/**
 * @swagger
 * /api/bookings/{id}/reject:
 *   patch:
 *     summary: Reject booking (Rider)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking rejected
 */
router.patch('/:id/reject', bookingController.rejectBooking);
/**
 * @swagger
 * /api/bookings/{id}/agree-price:
 *   patch:
 *     summary: Agree on final price (Partner or Rider)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               - price
 *             properties:
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Price agreed successfully
 *       400:
 *         description: Price below minimum fare
 */
router.patch('/:id/agree-price', bookingController.agreePrice);
/**
 * @swagger
 * /api/bookings/my:
 *   get:
 *     summary: Get my bookings (Partner or Rider)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/my', bookingController.getMyBookings);
exports.default = router;
