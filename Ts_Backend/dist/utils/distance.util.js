"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateETA = exports.calculateDistanceKm = void 0;
/**
 * Haversine formula to calculate distance between two lat/lng points
 * Returns distance in kilometers
 */
const calculateDistanceKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
exports.calculateDistanceKm = calculateDistanceKm;
const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
};
/**
 * Calculate ETA in minutes given distance and average speed
 */
const calculateETA = (distanceKm, avgSpeedKmH = 25) => {
    return Math.ceil((distanceKm / avgSpeedKmH) * 60); // minutes
};
exports.calculateETA = calculateETA;
