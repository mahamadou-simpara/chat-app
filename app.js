const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const MessageFormat = require('./utils/messageFormat');
const { joinUser, currentUser } = require('./utils/users');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

const name = 'ChatBox';

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = joinUser(socket.id, username, room);

    socket.join(room);
    socket.emit('message', MessageFormat(name, 'Welcome to ChatApp'));

    socket.broadcast
      .to(user.room)
      .emit('message', MessageFormat(name, `${username}  has joined the chat`));
  });

  socket.on('disconnect', () => {
    io.emit('message', MessageFormat(name, `${username} has left the chatApp`));
  });

  socket.on('chatMessage', (msg) => {
    const user = currentUser(socket.id);

    // console.log(user);

    io.to(user.room).emit('message', MessageFormat(user.username, msg));
    // console.log(msg);
  });
});

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
