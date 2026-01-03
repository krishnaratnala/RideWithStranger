const pool = require('../../config/db');

exports.getByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT 
        id,
        user_id,
        ST_AsText(default_location) AS default_location,
        wallet_balance,
        created_at,
        updated_at
     FROM partner_profiles
     WHERE user_id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('Partner profile not found');
  }

  return result.rows[0];
};

exports.create = async (userId, { latitude, longitude }) => {
  // prevent duplicate profile
  const existing = await pool.query(
    `SELECT id FROM partner_profiles WHERE user_id = $1`,
    [userId]
  );

  if (existing.rows.length > 0) {
    throw new Error('Partner profile already exists');
  }

  const result = await pool.query(
    `INSERT INTO partner_profiles
      (user_id, default_location)
     VALUES (
       $1,
       ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography
     )
     RETURNING id, user_id, wallet_balance, created_at`,
    [userId, longitude, latitude]
  );

  return result.rows[0];
};

exports.update = async (userId, { latitude, longitude }) => {
  const result = await pool.query(
    `UPDATE partner_profiles
     SET default_location =
       COALESCE(
         ST_SetSRID(ST_MakePoint($2, $3), 4326)::geography,
         default_location
       ),
       updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
     RETURNING id, user_id, wallet_balance, updated_at`,
    [userId, longitude, latitude]
  );

  if (result.rows.length === 0) {
    throw new Error('Partner profile not found');
  }

  return result.rows[0];
};
