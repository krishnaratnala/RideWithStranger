const pool = require('../../config/db');

exports.getByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT
        id,
        user_id,
        vehicle_number,
        license_number,
        availability,
        rating,
        bike_rc_image,
        government_id_image,
        bike_image,
        created_at
     FROM rider_profiles
     WHERE user_id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('Rider profile not found');
  }

  return result.rows[0];
};

exports.create = async (userId, data) => {
  const existing = await pool.query(
    `SELECT id FROM rider_profiles WHERE user_id = $1`,
    [userId]
  );

  if (existing.rows.length > 0) {
    throw new Error('Rider profile already exists');
  }

  const {
    vehicle_number,
    license_number,
    bike_rc_image,
    government_id_image,
    bike_image,
  } = data;

  const result = await pool.query(
    `INSERT INTO rider_profiles
     (user_id, vehicle_number, license_number,
      bike_rc_image, government_id_image, bike_image)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [
      userId,
      vehicle_number,
      license_number,
      bike_rc_image,
      government_id_image,
      bike_image,
    ]
  );

  return result.rows[0];
};

exports.updateAvailability = async (userId, availability) => {
  const result = await pool.query(
    `UPDATE rider_profiles
     SET availability = $2,
         updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
     RETURNING id, availability`,
    [userId, availability]
  );

  if (result.rows.length === 0) {
    throw new Error('Rider profile not found');
  }

  return result.rows[0];
};

exports.updateLocation = async (userId, { latitude, longitude }) => {
  // get rider id
  const riderRes = await pool.query(
    `SELECT id FROM rider_profiles WHERE user_id = $1`,
    [userId]
  );

  if (riderRes.rows.length === 0) {
    throw new Error('Rider profile not found');
  }

  const riderId = riderRes.rows[0].id;

  await pool.query(
    `INSERT INTO rider_locations (rider_id, current_location)
     VALUES (
       $1,
       ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography
     )
     ON CONFLICT (rider_id)
     DO UPDATE SET
       current_location = EXCLUDED.current_location,
       last_updated = CURRENT_TIMESTAMP`,
    [riderId, longitude, latitude]
  );
};
