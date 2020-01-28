const express = require('express');
const path = require('path');
const socket = require('socket.io');
const app = express();

const tasks = ['buty', 'zakupy'];

app.use(express.static(path.join(__dirname, './client/public')));
app.use(express.static(path.join(__dirname, './client/src')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/src/index.js'));
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('new user has connected');
  socket.emit('udpateData', tasks)

  socket.on('addTask', (task) => {
    console.log('addtask');
    tasks.push(task);
    socket.broadcast.emit('addTask', task);
  });

  socket.on('removeTask', (index) => {
    console.log('removeTask');
    tasks.splice(index, 1);
    socket.broadcast.emit('removeTask', index);
  });


});