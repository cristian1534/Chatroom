const express = require("express");
const app = express();
const path = require("path");
const color = require("colors");

const PORT = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, "dist")));

const server = app.listen(PORT, () => {
  console.log(color.yellow.bold(`Chat Server running on port: ${PORT}`));
});

const SocketIO = require("socket.io");
const io = SocketIO(server);
let username;
let count = 0;

io.on("connection", (socket) => {
  count++;
  io.emit("count", count);
  socket.on("message", (data) => {
    username = data.username;
    io.sockets.emit("message", data);
  });

  socket.on("joined", (data) => {
    socket.broadcast.emit("joined", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", () => {
    count--;
    io.emit("count", count);
    if (typeof username !== "undefined") {
      io.sockets.emit("userDisconnected", username);
    }
  });
});
