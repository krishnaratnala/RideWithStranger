import pool from '../../config/db';

/**
 * Ride lifecycle:
 * STARTED -> IN_PROGRESS -> COMPLETED -> RATED
 */

/**
 * Start a ride
 */
export const startRide = async (bookingId: string, riderId: string) => {
  const result = await pool.query(
    `UPDATE bookings
     SET status = 'STARTED',
         started_at = CURRENT_TIMESTAMP
     WHERE id = $1 AND rider_id = $2
     RETURNING *`,
    [bookingId, riderId]
  );

  return result.rows[0];
};

/**
 * Complete a ride
 */
export const completeRide = async (bookingId: string, riderId: string) => {
  const result = await pool.query(
    `UPDATE bookings
     SET status = 'COMPLETED',
         completed_at = CURRENT_TIMESTAMP
     WHERE id = $1 AND rider_id = $2
     RETURNING *`,
    [bookingId, riderId]
  );

  return result.rows[0];
};

/**
 * Rate a ride
 */
export const rateRide = async (
  bookingId: string,
  partnerId: string,
  rating: number,
  review?: string
) => {
  const result = await pool.query(
    `INSERT INTO ride_ratings (booking_id, partner_id, rating, review)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [bookingId, partnerId, rating, review || null]
  );

  return result.rows[0];
};

/**
 * Get ride details
 */
export const getRideDetails = async (bookingId: string) => {
  const result = await pool.query(
    `SELECT * FROM bookings WHERE id = $1`,
    [bookingId]
  );
  return result.rows[0];
};
