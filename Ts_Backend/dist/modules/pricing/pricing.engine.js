"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePrice = exports.validateBargainPrice = exports.calculateRidePricing = void 0;
const pricing_rules_1 = require("./pricing.rules");
/**
 * Calculate base price & minimum allowed price
 */
const calculateRidePricing = (distanceKm) => {
    const basePrice = distanceKm * pricing_rules_1.PRICING_RULES.BASE_FARE_PER_KM;
    const minByKm = distanceKm * pricing_rules_1.PRICING_RULES.MIN_FARE_PER_KM;
    const minByPercent = basePrice -
        (basePrice * pricing_rules_1.PRICING_RULES.MAX_BARGAIN_PERCENT) / 100;
    const minPrice = Math.max(minByKm, minByPercent, pricing_rules_1.PRICING_RULES.PLATFORM_MIN_FARE);
    return {
        basePrice: Math.round(basePrice),
        minPrice: Math.round(minPrice),
        maxPrice: Math.round(basePrice),
    };
};
exports.calculateRidePricing = calculateRidePricing;
/**
 * Validate bargained price
 */
const validateBargainPrice = (proposedPrice, pricing) => {
    return (proposedPrice >= pricing.minPrice &&
        proposedPrice <= pricing.maxPrice);
};
exports.validateBargainPrice = validateBargainPrice;
/**
 * Normalize bargained price (safety net)
 */
const normalizePrice = (proposedPrice, pricing) => {
    if (proposedPrice < pricing.minPrice)
        return pricing.minPrice;
    if (proposedPrice > pricing.maxPrice)
        return pricing.maxPrice;
    return proposedPrice;
};
exports.normalizePrice = normalizePrice;
