import { Server } from 'socket.io';
import http from 'http';

let io: Server;

export const initSocket = (server: http.Server) => {
  io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('🔌 Socket connected:', socket.id);
  });
};

export const getIO = () => io;
