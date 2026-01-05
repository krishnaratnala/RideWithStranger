"use strict";
/**
 * Pricing Rules Configuration
 * Change values here without touching core logic
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_RULES = void 0;
exports.PRICING_RULES = {
    BASE_FARE_PER_KM: 25, // ₹ per km
    MIN_FARE_PER_KM: 17.5, // Minimum ₹ per km (bargain floor)
    PLATFORM_MIN_FARE: 30, // Absolute minimum fare
    MAX_BARGAIN_PERCENT: 30, // Max % allowed to bargain down
};
