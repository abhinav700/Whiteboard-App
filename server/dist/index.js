"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});
io.on('connection', (socket) => {
    socket.emit("Hello from server");
    socket.on("Send-server", () => {
        socket.emit("again from server");
    });
});
server.listen(8080, () => {
    console.log("server is listening at port 8080");
});
