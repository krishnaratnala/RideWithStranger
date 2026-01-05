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
exports.getMyBookings = exports.agreePrice = exports.rejectBooking = exports.acceptBooking = exports.createBooking = void 0;
const bookingService = __importStar(require("./booking.service"));
const createBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.createBooking({
            partnerId: req.user.userId,
            riderId: req.body.riderId,
            pickupLocation: req.body.pickupLocation,
            dropLocation: req.body.dropLocation,
            distanceKm: req.body.distanceKm,
            basePrice: req.body.basePrice,
            minPrice: req.body.minPrice,
        });
        res.status(201).json({
            message: 'Booking request sent',
            booking,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.createBooking = createBooking;
const acceptBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.acceptBooking(req.params.id, req.user.userId);
        res.status(200).json({
            message: 'Booking accepted',
            booking,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.acceptBooking = acceptBooking;
const rejectBooking = async (req, res, next) => {
    try {
        const booking = await bookingService.rejectBooking(req.params.id, req.user.userId);
        res.status(200).json({
            message: 'Booking rejected',
            booking,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.rejectBooking = rejectBooking;
const agreePrice = async (req, res, next) => {
    try {
        const booking = await bookingService.getBookingById(req.params.id);
        if (req.body.price < booking.min_price) {
            return res.status(400).json({
                message: 'Price below minimum fare is not allowed',
            });
        }
        const updatedBooking = await bookingService.updateFinalPrice(req.params.id, req.body.price);
        res.status(200).json({
            message: 'Price agreed successfully',
            booking: updatedBooking,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.agreePrice = agreePrice;
const getMyBookings = async (req, res, next) => {
    try {
        const bookings = await bookingService.listBookingsByUser(req.user.userId, req.user.role);
        res.status(200).json(bookings);
    }
    catch (err) {
        next(err);
    }
};
exports.getMyBookings = getMyBookings;
