"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
io.on("connection", (socket) => {
    io.emit("new-client-joined");
    socket.on("draw-line", ({ prevPoint, currentPoint, hex, lineWidth }) => {
        socket.broadcast.emit("draw-line", { prevPoint, currentPoint, hex, lineWidth });
    });
    socket.on("clear-canvas", () => {
        socket.emit("clear-canvas");
    });
    socket.on("state-from-client", (drawingDataUrl) => {
        socket.broadcast.emit("state-from-server", drawingDataUrl);
    });
});
server.listen(8080, () => {
    console.log("server is listening at port 8080");
});
