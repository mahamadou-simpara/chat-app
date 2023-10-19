const path = require('path');
const http =  require('http')
const express = require('express');
const socketio = require('socket.io');

const app = express();

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));


io.on('connection', socket => {
   
    socket.emit('message', 'Welcome to ChatApp');

    socket.broadcast.emit('message', 'A user has joined the chat ');

    socket.on('disconnect', () => {
        io.emit('message', 'User has left the chatApp');
    });

    socket.on('chatMessage', (msg) => {
        io.emit('message', msg);
        // console.log(msg);
    })


});


const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));