import pool from '../../config/db';

export const updateRiderLocation = async (
  riderId: string,
  latitude: number,
  longitude: number
) => {
  await pool.query(
    `UPDATE riders
     SET current_latitude = $2,
         current_longitude = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1`,
    [riderId, latitude, longitude]
  );
};

export const getRiderLocation = async (riderId: string) => {
  const result = await pool.query(
    `SELECT current_latitude, current_longitude
     FROM riders
     WHERE user_id = $1`,
    [riderId]
  );

  return result.rows[0];
};
