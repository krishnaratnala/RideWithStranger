"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRideDetails = exports.rateRide = exports.completeRide = exports.startRide = void 0;
const db_1 = __importDefault(require("../../config/db"));
/**
 * Ride lifecycle:
 * STARTED -> IN_PROGRESS -> COMPLETED -> RATED
 */
/**
 * Start a ride
 */
const startRide = async (bookingId, riderId) => {
    const result = await db_1.default.query(`UPDATE bookings
     SET status = 'STARTED',
         started_at = CURRENT_TIMESTAMP
     WHERE id = $1 AND rider_id = $2
     RETURNING *`, [bookingId, riderId]);
    return result.rows[0];
};
exports.startRide = startRide;
/**
 * Complete a ride
 */
const completeRide = async (bookingId, riderId) => {
    const result = await db_1.default.query(`UPDATE bookings
     SET status = 'COMPLETED',
         completed_at = CURRENT_TIMESTAMP
     WHERE id = $1 AND rider_id = $2
     RETURNING *`, [bookingId, riderId]);
    return result.rows[0];
};
exports.completeRide = completeRide;
/**
 * Rate a ride
 */
const rateRide = async (bookingId, partnerId, rating, review) => {
    const result = await db_1.default.query(`INSERT INTO ride_ratings (booking_id, partner_id, rating, review)
     VALUES ($1, $2, $3, $4)
     RETURNING *`, [bookingId, partnerId, rating, review || null]);
    return result.rows[0];
};
exports.rateRide = rateRide;
/**
 * Get ride details
 */
const getRideDetails = async (bookingId) => {
    const result = await db_1.default.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);
    return result.rows[0];
};
exports.getRideDetails = getRideDetails;
