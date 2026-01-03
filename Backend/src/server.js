const http = require('http');
const app = require('./app');
const initSocket = require('./config/socket');
require('dotenv').config();

const server = http.createServer(app);

// Init WebSocket
initSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
