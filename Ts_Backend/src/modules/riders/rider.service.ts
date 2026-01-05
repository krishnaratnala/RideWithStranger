import pool from '../../config/db';

export const getRiderProfile = async (userId: string) => {
  const result = await pool.query(
    `SELECT 
        r.id AS rider_id,
        u.name,
        u.phone_number,
        u.profile_image,
        r.bike_number,
        r.bike_model,
        r.is_available,
        r.created_at
     FROM riders r
     JOIN users u ON u.id = r.user_id
     WHERE r.user_id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('Rider profile not found');
  }

  return result.rows[0];
};

export const updateRiderProfile = async (
  userId: string,
  data: {
    bike_number?: string;
    bike_model?: string;
    is_available?: boolean;
  }
) => {
  const result = await pool.query(
    `UPDATE riders
     SET
       bike_number = COALESCE($2, bike_number),
       bike_model = COALESCE($3, bike_model),
       is_available = COALESCE($4, is_available),
       updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
     RETURNING *`,
    [userId, data.bike_number, data.bike_model, data.is_available]
  );

  return result.rows[0];
};

export const setRiderAvailability = async (
  userId: string,
  isAvailable: boolean
) => {
  const result = await pool.query(
    `UPDATE riders
     SET is_available = $2, updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
     RETURNING id, is_available`,
    [userId, isAvailable]
  );

  return result.rows[0];
};
