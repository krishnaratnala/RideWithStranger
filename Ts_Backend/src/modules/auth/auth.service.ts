import pool from '../../config/db';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../utils/jwt.util';

interface RegisterInput {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  role: 'RIDER' | 'PARTNER';
}

interface LoginInput {
  email: string;
  password: string;
}

export class AuthService {
  static async register(input: RegisterInput) {
    console.log("Reached AuthService.register 2 ");
    const { name, email, phone_number, password, role } = input;
    console.log("Input Data:", input);

    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1 OR phone_number = $2', [email, phone_number]);
    if (existingUser.rows.length > 0) {
      console.log("Reached AuthService.register Existing User  ");
      throw new Error('User with this email or phone number already exists');
    }
    console.log("Loiging ExistinG uSER......... ",existingUser);


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user
    console.log("Reached AuthService.register Inserting User  ");
    const result = await pool.query(
      'INSERT INTO users (name, email, phone_number, password_hash, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING id, name, email, phone_number, role',
      [name, email, phone_number, hashedPassword, role]
    );

    return result.rows[0];
  }

  static async login(input: LoginInput) {
    const { email, password } = input;

    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) throw new Error('User not found');

    // Check password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) throw new Error('Invalid password');

    // Generate JWT token
    const token = generateToken({ userId: user.id, role: user.role, email: user.email });
    return token;
  }
}
