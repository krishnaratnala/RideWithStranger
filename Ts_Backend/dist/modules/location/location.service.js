"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRiderLocation = exports.updateRiderLocation = void 0;
const db_1 = __importDefault(require("../../config/db"));
const updateRiderLocation = async (riderId, latitude, longitude) => {
    await db_1.default.query(`UPDATE riders
     SET current_latitude = $2,
         current_longitude = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE user_id = $1`, [riderId, latitude, longitude]);
};
exports.updateRiderLocation = updateRiderLocation;
const getRiderLocation = async (riderId) => {
    const result = await db_1.default.query(`SELECT current_latitude, current_longitude
     FROM riders
     WHERE user_id = $1`, [riderId]);
    return result.rows[0];
};
exports.getRiderLocation = getRiderLocation;
