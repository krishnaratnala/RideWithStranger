"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletBalance = exports.updatePartnerProfile = exports.getPartnerProfile = void 0;
const db_1 = __importDefault(require("../../config/db"));
const getPartnerProfile = async (userId) => {
    const result = await db_1.default.query(`SELECT 
        p.id AS partner_id,
        u.name,
        u.phone_number,
        u.profile_image,
        p.default_location,
        p.wallet_balance,
        p.created_at
     FROM partners p
     JOIN users u ON u.id = p.user_id
     WHERE p.user_id = $1`, [userId]);
    if (result.rows.length === 0) {
        throw new Error('Partner profile not found');
    }
    return result.rows[0];
};
exports.getPartnerProfile = getPartnerProfile;
const updatePartnerProfile = async (userId, data) => {
    const result = await db_1.default.query(`UPDATE partners
     SET
       default_location = COALESCE($2, default_location),
       updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1
     RETURNING *`, [userId, data.default_location]);
    return result.rows[0];
};
exports.updatePartnerProfile = updatePartnerProfile;
const getWalletBalance = async (userId) => {
    const result = await db_1.default.query(`SELECT wallet_balance FROM partners WHERE user_id = $1`, [userId]);
    return result.rows[0];
};
exports.getWalletBalance = getWalletBalance;
