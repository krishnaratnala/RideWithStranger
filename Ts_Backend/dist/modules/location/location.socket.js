"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationSocket = void 0;
const location_service_1 = require("./location.service");
const locationSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('📍 Location socket connected:', socket.id);
        /**
         * Rider joins booking room
         */
        socket.on('join-ride', ({ bookingId }) => {
            socket.join(`ride-${bookingId}`);
            console.log(`Rider joined room ride-${bookingId}`);
        });
        /**
         * Rider sends live location
         */
        socket.on('rider-location-update', async (data) => {
            try {
                const { riderId, latitude, longitude, bookingId } = data;
                // Persist last known location
                await (0, location_service_1.updateRiderLocation)(riderId, latitude, longitude);
                // Emit to partner in same booking room
                io.to(`ride-${bookingId}`).emit('rider-location', {
                    latitude,
                    longitude,
                    timestamp: new Date(),
                });
            }
            catch (error) {
                console.error('Location update error', error);
            }
        });
        /**
         * Disconnect
         */
        socket.on('disconnect', () => {
            console.log('❌ Location socket disconnected:', socket.id);
        });
    });
};
exports.locationSocket = locationSocket;
