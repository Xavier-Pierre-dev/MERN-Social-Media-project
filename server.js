//! Fichier pivot qui dirige toute la partie back-end

const express = require('express');
const socket = require("socket.io");

//si express < 4.16
//const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const room_conversation = require('./routes/room_conversation.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const app = express();







const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }
  app.use(cors(corsOptions));
  

//utile pour traiter la data 
//body-parser inclus dans express pour express > 4.16 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// si express < 4.16
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});
app.patch('*', checkUser);
app.patch('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});



// routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/message', room_conversation);

// server (toujours a la fin de server.js)
const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})



//socket
io = socket(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true
    }
  });


io.on("connection", (socket) => {
    console.log(socket.id);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log("User Joined Room: " + data);
    });
  
    socket.on("send_message", (data) => {
      console.log(data);
      console.log(data.room);
      //socket.to(data.room).emit(`receive_message : ${data.room}`, data.content);
      //io.emit(`receive_message : ${data.room}`, data.content);
      socket.broadcast.to(data.room).emit(`receive_message : ${data.room}`, data.content);
      //socket.emit(data.room, data.content);
      //io.emit(data.room, data.content);
      //socket.to(data.room).emit(data.room, data.content);
      //socket.emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("USER DISCONNECTED");
    });
});
