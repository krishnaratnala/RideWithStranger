import pool from '../../config/db';

/**
 * Booking Status Flow:
 * REQUESTED -> ACCEPTED -> PRICE_AGREED -> STARTED -> COMPLETED -> CANCELLED
 */

export const createBooking = async (data: {
  partnerId: string;
  riderId: string;
  pickupLocation: string;
  dropLocation: string;
  distanceKm: number;
  basePrice: number;
  minPrice: number;
}) => {
  const result = await pool.query(
    `INSERT INTO bookings (
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
     RETURNING *`,
    [
      data.partnerId,
      data.riderId,
      data.pickupLocation,
      data.dropLocation,
      data.distanceKm,
      data.basePrice,
      data.minPrice,
    ]
  );

  return result.rows[0];
};

export const getBookingById = async (bookingId: string) => {
  const result = await pool.query(
    `SELECT * FROM bookings WHERE id = $1`,
    [bookingId]
  );
  return result.rows[0];
};

export const acceptBooking = async (bookingId: string, riderId: string) => {
  const result = await pool.query(
    `UPDATE bookings
     SET status = 'ACCEPTED'
     WHERE id = $1 AND rider_id = $2
     RETURNING *`,
    [bookingId, riderId]
  );

  return result.rows[0];
};

export const rejectBooking = async (bookingId: string, riderId: string) => {
  const result = await pool.query(
    `UPDATE bookings
     SET status = 'CANCELLED'
     WHERE id = $1 AND rider_id = $2
     RETURNING *`,
    [bookingId, riderId]
  );

  return result.rows[0];
};

export const updateFinalPrice = async (
  bookingId: string,
  agreedPrice: number
) => {
  const result = await pool.query(
    `UPDATE bookings
     SET final_price = $2, status = 'PRICE_AGREED'
     WHERE id = $1
     RETURNING *`,
    [bookingId, agreedPrice]
  );

  return result.rows[0];
};

export const listBookingsByUser = async (
  userId: string,
  role: 'RIDER' | 'PARTNER'
) => {
  const column = role === 'RIDER' ? 'rider_id' : 'partner_id';

  const result = await pool.query(
    `SELECT * FROM bookings
     WHERE ${column} = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return result.rows;
};
