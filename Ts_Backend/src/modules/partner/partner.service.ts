import pool from '../../config/db';

export const getPartnerProfile = async (userId: string) => {
  const result = await pool.query(
    `SELECT 
        p.id AS partner_id,
        u.name,
        u.phone_number,
        u.profile_image,
        p.default_location,
        p.wallet_balance,
        p.created_at
     FROM partners p
     JOIN users u ON u.id = p.user_id
     WHERE p.user_id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('Partner profile not found');
  }

  return result.rows[0];
};

export const updatePartnerProfile = async (
  userId: string,
  data: {
    default_location?: string;
  }
) => {
  const result = await pool.query(
    `UPDATE partners
     SET
       default_location = COALESCE($2, default_location),
       updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
     RETURNING *`,
    [userId, data.default_location]
  );

  return result.rows[0];
};

export const getWalletBalance = async (userId: string) => {
  const result = await pool.query(
    `SELECT wallet_balance FROM partners WHERE user_id = $1`,
    [userId]
  );

  return result.rows[0];
};
