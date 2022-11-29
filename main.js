const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const {saveUser,getUser,getAllUsers,onDissconect} = require('./utils/users');
const formatData = require('./utils/formatMyData');

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/room', (req, res) => { 
    res.render('room');
});

io.on('connection', (socket) => {
  
  // join room
  socket.on('joinRoom',function({username,room}){
    let newUser = saveUser(socket.id,username,room);
    socket.join(newUser.room);
    socket.emit('message',formatData('Admin','Welcome User!'));
    socket.broadcast.to(newUser.room).emit('message',formatData('Admin', newUser.username + ' has Joined the chat!'));
    io.to(newUser.room).emit('roomUsers',{room:newUser.room,members: getAllUsers(newUser.room)});
  });
  // messages
  socket.on('message',function(data){
    const user = getUser(socket.id);
    io.to(user.room).emit('message',formatData(user.username,data));
  }); 
  //dissconnect
  socket.on('disconnect',function(){
    let user = onDissconect(socket.id);
    console.log('user dissconected =>',socket.id);
    if(user){
      io.to(user.room).emit('message',formatData('Admin', user.username + ' left the chat'));
    }
    io.to(user.room).emit('roomUsers',{room:user.room , members: getAllUsers(user.room)});
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});