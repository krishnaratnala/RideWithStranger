import pool from '../../config/db';

export const getUserById = async (userId: string) => {
  const result = await pool.query(
    `SELECT id, name, phone_number, email, role, profile_image, created_at
     FROM users
     WHERE id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  return result.rows[0];
};

export const updateUser = async (
  userId: string,
  data: { name?: string; email?: string; profile_image?: string }
) => {
  const result = await pool.query(
    `UPDATE users
     SET
       name = COALESCE($2, name),
       email = COALESCE($3, email),
       profile_image = COALESCE($4, profile_image),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING id, name, email, profile_image`,
    [userId, data.name, data.email, data.profile_image]
  );

  return result.rows[0];
};
