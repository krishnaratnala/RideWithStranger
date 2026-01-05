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
exports.getRideDetails = exports.rateRide = exports.completeRide = exports.startRide = void 0;
const rideService = __importStar(require("./ride.service"));
const startRide = async (req, res, next) => {
    try {
        const ride = await rideService.startRide(req.params.bookingId, req.user.userId);
        res.status(200).json({ message: 'Ride started', ride });
    }
    catch (err) {
        next(err);
    }
};
exports.startRide = startRide;
const completeRide = async (req, res, next) => {
    try {
        const ride = await rideService.completeRide(req.params.bookingId, req.user.userId);
        res.status(200).json({ message: 'Ride completed', ride });
    }
    catch (err) {
        next(err);
    }
};
exports.completeRide = completeRide;
const rateRide = async (req, res, next) => {
    try {
        const { rating, review } = req.body;
        const rated = await rideService.rateRide(req.params.bookingId, req.user.userId, rating, review);
        res.status(200).json({ message: 'Ride rated successfully', rated });
    }
    catch (err) {
        next(err);
    }
};
exports.rateRide = rateRide;
const getRideDetails = async (req, res, next) => {
    try {
        const ride = await rideService.getRideDetails(req.params.bookingId);
        res.status(200).json(ride);
    }
    catch (err) {
        next(err);
    }
};
exports.getRideDetails = getRideDetails;
