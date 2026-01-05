import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import dotenv from 'dotenv';
import { locationSocket } from './modules/location/location.socket';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH'],
  },
});

// Initialize location sockets
locationSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📄 Swagger docs at http://localhost:${PORT}/docs`);
});
