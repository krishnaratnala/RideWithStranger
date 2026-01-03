const pool = require('../../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async ({
  name,
  phone_number,
  email,
  password,
  role,
}) => {
  // Check existing user
  const existing = await pool.query(
    'SELECT id FROM users WHERE phone_number = $1',
    [phone_number]
  );

  if (existing.rows.length > 0) {
    throw new Error('User already exists with this phone number');
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert user
  const result = await pool.query(
    `INSERT INTO users 
      (name, phone_number, email, password_hash, role)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING id, name, phone_number, email, role, created_at`,
    [name, phone_number, email, passwordHash, role]
  );

  return result.rows[0];
};

exports.login = async ({ phone_number, password }) => {
  const result = await pool.query(
    `SELECT id, name, phone_number, password_hash, role
     FROM users
     WHERE phone_number = $1`,
    [phone_number]
  );

  if (result.rows.length === 0) {
    throw new Error('Invalid phone number or password');
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Invalid phone number or password');
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      phone_number: user.phone_number,
      role: user.role,
    },
  };
};
