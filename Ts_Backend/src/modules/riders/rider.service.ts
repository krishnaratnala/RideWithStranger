import pool from '../../config/db';

export const riderService = {
  async updateRiderProfile(
    userId: string,
    data: {
      vehicle_number?: string;
      license_number?: string;
      vehicle_type?: string;
      rc_image?: string;
      government_proof_image?: string;
      bike_image?: string;
    }
  ) {
    const result = await pool.query(
      `
      UPDATE riders SET
        vehicle_number = COALESCE($2, vehicle_number),
        license_number = COALESCE($3, license_number),
        vehicle_type = COALESCE($4, vehicle_type),
        rc_image = COALESCE($5, rc_image),
        government_proof_image = COALESCE($6, government_proof_image),
        bike_image = COALESCE($7, bike_image),
        updated_at = NOW()
      WHERE user_id = $1
      RETURNING *;
      `,
      [
        userId,
        data.vehicle_number,
        data.license_number,
        data.vehicle_type,
        data.rc_image,
        data.government_proof_image,
        data.bike_image,
      ]
    );

    if (result.rows.length === 0) {
      throw new Error('Rider not found');
    }

    return result.rows[0];
  },
};


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
