"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Ensure JWT_SECRET exists
 */
const JWT_SECRET = (() => {
    if (!process.env.JWT_SECRET) {
        throw new Error('❌ JWT_SECRET is not defined in environment variables');
    }
    return process.env.JWT_SECRET;
})();
/**
 * Generate JWT token
 */
const generateToken = (payload, expiresIn = '7d') => {
    const options = { expiresIn };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
};
exports.generateToken = generateToken;
/**
 * Verify JWT token
 */
const verifyToken = (token) => {
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    return {
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email,
    };
};
exports.verifyToken = verifyToken;
