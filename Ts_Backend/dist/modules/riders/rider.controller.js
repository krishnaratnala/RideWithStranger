"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.riderController = void 0;
const riderService = __importStar(require("./rider.service"));
exports.riderController = {
    async updateProfile(req, res, next) {
        try {
            const authReq = req;
            const userId = authReq.user.userId;
            const body = authReq.body;
            const files = authReq.files && !Array.isArray(authReq.files)
                ? authReq.files
                : undefined;
            const rider = await riderService.riderService.updateRiderProfile(userId, {
                vehicle_number: body.vehicle_number,
                license_number: body.license_number,
                vehicle_type: body.vehicle_type,
                rc_image: files?.rc_image?.[0]?.filename,
                government_proof_image: files?.government_proof_image?.[0]?.filename,
                bike_image: files?.bike_image?.[0]?.filename,
            });
            res.status(200).json({
                message: 'Rider profile updated successfully',
                rider,
            });
        }
        catch (error) {
            next(error);
        }
    },
    async getProfile(req, res, next) {
        try {
            const rider = await riderService.getRiderProfile(req.user.userId);
            res.status(200).json(rider);
        }
        catch (err) {
            next(err);
        }
    },
    async updateAvailability(req, res, next) {
        try {
            const rider = await riderService.setRiderAvailability(req.user.userId, req.body.is_available);
            res.status(200).json({
                message: 'Availability updated',
                rider,
            });
        }
        catch (err) {
            next(err);
        }
    },
};
