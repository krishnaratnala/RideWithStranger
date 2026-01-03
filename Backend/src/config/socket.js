const { Server } = require('socket.io');

function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('🟢 Socket connected:', socket.id);

    socket.on('rider:location', (data) => {
      socket.to(data.bookingId).emit('partner:location', data);
    });

    socket.on('join:booking', (bookingId) => {
      socket.join(bookingId);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected');
    });
  });
}

module.exports = initSocket;
