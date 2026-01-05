"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listBookingsByUser = exports.updateFinalPrice = exports.rejectBooking = exports.acceptBooking = exports.getBookingById = exports.createBooking = void 0;
const db_1 = __importDefault(require("../../config/db"));
/**
 * Booking Status Flow:
 * REQUESTED -> ACCEPTED -> PRICE_AGREED -> STARTED -> COMPLETED -> CANCELLED
 */
const createBooking = async (data) => {
    const result = await db_1.default.query(`INSERT INTO bookings (
        partner_id,
        rider_id,
        pickup_location,
        drop_location,
        distance_km,
        base_price,
        min_price,
        final_price,
        status
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7,NULL,'REQUESTED')
     RETURNING *`, [
        data.partnerId,
        data.riderId,
        data.pickupLocation,
        data.dropLocation,
        data.distanceKm,
        data.basePrice,
        data.minPrice,
    ]);
    return result.rows[0];
};
exports.createBooking = createBooking;
const getBookingById = async (bookingId) => {
    const result = await db_1.default.query(`SELECT * FROM bookings WHERE id = $1`, [bookingId]);
    return result.rows[0];
};
exports.getBookingById = getBookingById;
const acceptBooking = async (bookingId, riderId) => {
    const result = await db_1.default.query(`UPDATE bookings
     SET status = 'ACCEPTED'
     WHERE id = $1 AND rider_id = $2
     RETURNING *`, [bookingId, riderId]);
    return result.rows[0];
};
exports.acceptBooking = acceptBooking;
const rejectBooking = async (bookingId, riderId) => {
    const result = await db_1.default.query(`UPDATE bookings
     SET status = 'CANCELLED'
     WHERE id = $1 AND rider_id = $2
     RETURNING *`, [bookingId, riderId]);
    return result.rows[0];
};
exports.rejectBooking = rejectBooking;
const updateFinalPrice = async (bookingId, agreedPrice) => {
    const result = await db_1.default.query(`UPDATE bookings
     SET final_price = $2, status = 'PRICE_AGREED'
     WHERE id = $1
     RETURNING *`, [bookingId, agreedPrice]);
    return result.rows[0];
};
exports.updateFinalPrice = updateFinalPrice;
const listBookingsByUser = async (userId, role) => {
    const column = role === 'RIDER' ? 'rider_id' : 'partner_id';
    const result = await db_1.default.query(`SELECT * FROM bookings
     WHERE ${column} = $1
     ORDER BY created_at DESC`, [userId]);
    return result.rows;
};
exports.listBookingsByUser = listBookingsByUser;
