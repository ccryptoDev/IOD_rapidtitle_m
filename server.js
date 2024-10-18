const express = require('express');

const path = require('path');
const cors = require('cors');
const app = express();
const http = require('http');
const connectDB = require('./config/db');
const { Server } = require('socket.io');
const MessageModel = require('./models/Message');
const { writeFile } = require('fs');
const fs = require('fs');
const router = express.Router();

connectDB();
// Connect Database

const corsOptions = {
  origin: function (origin, callback) {
    // if (!origin || whitelist.indexOf(origin) !== -1) {
    callback(null, true);
    // } else {
    //   callback(new Error("Not allowed by CORS"))
    // }
  },
  credentials: true
};
app.use(cors(corsOptions));

// Init Middleware
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

app.use('/api/v2/users', require('./routes/api/users'));
app.use('/api/v2/auth', require('./routes/api/auth'));
app.use('/api/v2/profile', require('./routes/api/profile'));
app.use('/api/v2/titles', require('./routes/api/titles'));
app.use('/api/v2/messages', require('./routes/api/messages'));
app.use('/api/v2/holdingtitles', require('./routes/api/holdingtitles'));
app.use('/api/v2/fileupload', require('./routes/api/fileupload'));

app.use("/uploads",express.static(path.join(__dirname, "./uploads/")));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const CHAT_BOT = 'ChatBot';
let chatRoom = ''; // E.g. javascript, node,...
let allUsers = []; // All users in current chat room

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);

  // We can write our socket event listeners in here...
  socket.on('join_room', (data) => {
    const { user, room_name } = data; // Data sent from client when join_room event emitted
    socket.join(room_name); // Join the user to a socket room
    console.log(data);
    let __createdtime__ = Date.now(); // Current timestamp
    // Send message to all users currently in the room, apart from the user that just joined
    // socket.to(room_name).emit('receive_message', {
    //   chat: `${user.username} has joined the chat room`,
    //   chat_room_id: CHAT_BOT,
    //   __createdtime__,
    // });
    // socket.emit('receive_message', {
    //     user_name: user.username,
    //     chat: `Welcome ${user.username}`,
    //     chat_room_id: CHAT_BOT,
    //     __createdtime__,
    // });
    // Save the new user to the room
    // chatRoom = room_name;
    // const user_username = user.username;
    // allUsers.push({ id: socket.id, user_username, room_name });
    // chatRoomUsers = allUsers.filter((user) => user.room_name === room_name);
    // socket.to(room_name).emit('chatroom_users', chatRoomUsers);
    // socket.emit('chatroom_users', chatRoomUsers);
  });
  socket.on('send_message', (data) => {
    const { chat_room_id, chat_room_name, user_fname, user_id, chat, __createdtime__, uploadedFiles } = data;
    console.log(data);
    let message = new MessageModel();
    message.sender = user_id;
    message.roomId = chat_room_id;
    message.roomName = chat_room_name;
    message.content = chat;
    message.filePath = uploadedFiles;
    message.createdAt = __createdtime__;
    message.save();
    // socket.to(chat_room_name).emit('receive_message', data);
    io.in(chat_room_name).emit('receive_message', data); 
    // Send to all users in room, including sender
  });
  socket.on('leave_room', (data) => {
    const { user, chat_room_name } = data;
    socket.leave(chat_room_name);
    const __createdtime__ = Date.now();
    // Remove user from memory
    // allUsers = allUsers.filter((user) => user.room_name === room_name);
    // socket.to(chat_room_name).emit('chatroom_users', allUsers);
    // socket.to(chat_room_name).emit('receive_message', {
    //   chat_room_id: CHAT_BOT,
    //   chat: `${user.username} has left the chat`,
    //   __createdtime__,
    // });
  });
});





server.listen(PORT, () => console.log(`Server started on port ${PORT}`));


