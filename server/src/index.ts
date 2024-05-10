import { Socket } from "socket.io";

const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  socket.emit("Hello from server");
  console.log("Connected  ")
  socket.on("draw-line",({ prevPoint, currentPoint, hex, lineWidth }: DrawLineEventProps) => {
      console.log({prevPoint, currentPoint})
      socket.broadcast.emit("draw-line", {prevPoint,currentPoint,hex,lineWidth});
    }
  );
});

server.listen(8080, () => {
  console.log("server is listening at port 8080");
});
