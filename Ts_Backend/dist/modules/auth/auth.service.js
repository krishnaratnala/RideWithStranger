"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const db_1 = __importDefault(require("../../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_util_1 = require("../../utils/jwt.util");
class AuthService {
    static async register(input) {
        console.log("Reached AuthService.register 2 ");
        const { name, email, phone_number, password, role } = input;
        console.log("Input Data:", input);
        // Check if user exists
        const existingUser = await db_1.default.query('SELECT * FROM users WHERE email = $1 OR phone_number = $2', [email, phone_number]);
        if (existingUser.rows.length > 0) {
            console.log("Reached AuthService.register Existing User  ");
            throw new Error('User with this email or phone number already exists');
        }
        console.log("Loiging ExistinG uSER......... ", existingUser);
        // Hash password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        // Insert user
        console.log("Reached AuthService.register Inserting User  ");
        const result = await db_1.default.query('INSERT INTO users (name, email, phone_number, password_hash, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING id, name, email, phone_number, role', [name, email, phone_number, hashedPassword, role]);
        return result.rows[0];
    }
    static async login(input) {
        const { email, password } = input;
        // Find user
        const result = await db_1.default.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        if (!user)
            throw new Error('User not found');
        // Check password
        const isMatch = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isMatch)
            throw new Error('Invalid password');
        // Generate JWT token
        const token = (0, jwt_util_1.generateToken)({ userId: user.id, role: user.role, email: user.email });
        return token;
    }
}
exports.AuthService = AuthService;
