require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow from all origins, change this in production
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("WebSocket server is running");
});

io.on("connection", (socket) => {
  console.log("New client connected: " + socket.id);

  socket.on("message", (data) => {
    console.log("Received message:", data);
    // You can broadcast this message to all other clients if needed
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
