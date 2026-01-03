const pool = require('../../config/db');

exports.startRide = async ({ bookingId, finalPrice }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Validate booking
    const bookingRes = await client.query(
      `SELECT * FROM bookings
       WHERE id = $1 AND status = 'PRICE_CONFIRMED'`,
      [bookingId]
    );

    if (bookingRes.rows.length === 0) {
      throw new Error('Invalid or unconfirmed booking');
    }

    const booking = bookingRes.rows[0];

    // Create ride
    const rideRes = await client.query(
      `INSERT INTO rides
       (booking_id, rider_id, partner_id, final_price, status)
       VALUES ($1,$2,$3,$4,'ONGOING')
       RETURNING *`,
      [
        booking.id,
        booking.rider_id,
        booking.partner_id,
        finalPrice,
      ]
    );

    // Update booking status
    await client.query(
      `UPDATE bookings
       SET status = 'RIDE_STARTED'
       WHERE id = $1`,
      [bookingId]
    );

    await client.query('COMMIT');
    return rideRes.rows[0];

  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

exports.completeRide = async (rideId) => {
  const result = await pool.query(
    `UPDATE rides
     SET status = 'COMPLETED',
         completed_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING *`,
    [rideId]
  );

  if (result.rows.length === 0) {
    throw new Error('Ride not found');
  }

  return result.rows[0];
};

exports.getRideById = async (rideId) => {
  const result = await pool.query(
    `SELECT *
     FROM rides
     WHERE id = $1`,
    [rideId]
  );

  if (result.rows.length === 0) {
    throw new Error('Ride not found');
  }

  return result.rows[0];
};
