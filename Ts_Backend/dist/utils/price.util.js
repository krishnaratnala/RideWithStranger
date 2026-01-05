"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clampPrice = exports.ensureMinFare = exports.roundPrice = void 0;
/**
 * Round price to nearest integer
 */
const roundPrice = (price) => {
    return Math.round(price);
};
exports.roundPrice = roundPrice;
/**
 * Ensure price does not go below minimum
 */
const ensureMinFare = (price, minFare) => {
    return price < minFare ? minFare : price;
};
exports.ensureMinFare = ensureMinFare;
/**
 * Clamp price between min and max
 */
const clampPrice = (price, min, max) => {
    if (price < min)
        return min;
    if (price > max)
        return max;
    return price;
};
exports.clampPrice = clampPrice;
