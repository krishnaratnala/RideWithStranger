import { Server, Socket } from 'socket.io';
import { updateRiderLocation } from './location.service';

interface LocationPayload {
  latitude: number;
  longitude: number;
  bookingId: string;
}

export const locationSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
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
    socket.on(
      'rider-location-update',
      async (data: LocationPayload & { riderId: string }) => {
        try {
          const { riderId, latitude, longitude, bookingId } = data;

          // Persist last known location
          await updateRiderLocation(riderId, latitude, longitude);

          // Emit to partner in same booking room
          io.to(`ride-${bookingId}`).emit('rider-location', {
            latitude,
            longitude,
            timestamp: new Date(),
          });
        } catch (error) {
          console.error('Location update error', error);
        }
      }
    );

    /**
     * Disconnect
     */
    socket.on('disconnect', () => {
      console.log('❌ Location socket disconnected:', socket.id);
    });
  });
};
