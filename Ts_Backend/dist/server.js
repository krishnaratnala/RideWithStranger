"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const location_socket_1 = require("./modules/location/location.socket");
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
// Create HTTP server
const server = http_1.default.createServer(app_1.default);
// Setup Socket.IO
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PATCH'],
    },
});
// Initialize location sockets
(0, location_socket_1.locationSocket)(io);
// Start server
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📄 Swagger docs at http://localhost:${PORT}/docs`);
});
