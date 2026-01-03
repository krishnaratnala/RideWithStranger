const pool = require('../../config/db');

exports.create = async ({ partnerId, riderId, distanceKm }) => {
  const basePrice = distanceKm * 25;

  const result = await pool.query(
    `INSERT INTO bookings (partner_id, rider_id, distance_km, base_price, status)
     VALUES ($1,$2,$3,$4,'REQUESTED') RETURNING *`,
    [partnerId, riderId, distanceKm, basePrice]
  );

  return result.rows[0];
};
