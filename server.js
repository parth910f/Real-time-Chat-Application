
const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const { sequelize, User, Message } = require("./models");
const authRoutes = require("./routes/auth");
const jwt = require("jsonwebtoken");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/auth", authRoutes);

// Serve HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// app.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'login.html'));
// });

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const payload = jwt.verify(token, "secret");
    socket.user = await User.findByPk(payload.id);
    next();
  } catch (error) {
    next(new Error("Authentication error"));
  }
});

io.on("connection", (socket) => {
  console.log(`User ${socket.user.username} connected`);

  socket.on("message", async (text) => {
    const message = await Message.create({ text, UserId: socket.user.id });
    io.emit("message", { text: message.text, user: socket.user.username });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  sequelize.sync();
});
