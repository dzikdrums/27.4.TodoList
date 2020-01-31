const express = require('express');
const socket = require('socket.io');
const app = express();

const tasks = [];

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('new user has connected');
  socket.emit('updateData', tasks)

  socket.on('addTask', (task) => {
    tasks.push(task);
    socket.broadcast.emit('addTask', task, 'emitted');
  });

  socket.on('removeTask', (id) => {
    tasks.forEach((item, index) => {
      if( item.id === id) {
        tasks.splice(index, 1);
      };
    });
    socket.broadcast.emit('removeTask', id, 'emitted');
  });
});