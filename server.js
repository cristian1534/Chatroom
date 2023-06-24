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

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("message", (data) => {
    io.sockets.emit("message", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});
