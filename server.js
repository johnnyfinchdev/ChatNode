const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('User: ' + socket.client.id + ' connected');

  // Listen for chat messages from clients
  socket.on('chat message', (msg) => {
    // Broadcast the message to all connected clients
    io.emit('chat message', {msg, name: socket.client.id});
  });

  socket.on('disconnect', () => {
    console.log('User: ' + socket.client.id + ' disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});   