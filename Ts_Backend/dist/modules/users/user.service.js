"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getUserById = async (userId) => {
    const result = await db_1.default.query(`SELECT id, name, phone_number, email, role, profile_image, created_at
     FROM users
     WHERE id = $1`, [userId]);
    if (result.rows.length === 0) {
        throw new Error('User not found');
    }
    return result.rows[0];
};
exports.getUserById = getUserById;
const updateUser = async (userId, data) => {
    const result = await db_1.default.query(`UPDATE users
     SET
       name = COALESCE($2, name),
       email = COALESCE($3, email),
       profile_image = COALESCE($4, profile_image),
       updated_at = CURRENT_TIMESTAMP
     WHERE id = $1
     RETURNING id, name, email, profile_image`, [userId, data.name, data.email, data.profile_image]);
    return result.rows[0];
};
exports.updateUser = updateUser;
