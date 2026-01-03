const pool = require('../../config/db');

exports.getById = async (userId) => {
  const result = await pool.query(
    `SELECT 
        id, 
        name, 
        phone_number, 
        email, 
        role, 
        profile_image,
        created_at
     FROM users
     WHERE id = $1`,
    [userId]
  );

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  return result.rows[0];
};

exports.update = async (userId, { name, email, profile_image }) => {
  const result = await pool.query(
    `UPDATE users
     SET 
       name = COALESCE($1, name),
       email = COALESCE($2, email),
       profile_image = COALESCE($3, profile_image),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $4
     RETURNING id, name, phone_number, email, role, profile_image`,
    [name, email, profile_image, userId]
  );

  if (result.rows.length === 0) {
    throw new Error('User not found');
  }

  return result.rows[0];
};
