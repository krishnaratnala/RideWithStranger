"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: { origin: '*' }
    });
    io.on('connection', (socket) => {
        console.log('🔌 Socket connected:', socket.id);
    });
};
exports.initSocket = initSocket;
const getIO = () => io;
exports.getIO = getIO;
