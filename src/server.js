const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

// Em uma aplicação Real não se deve colocar os dados de conexão com o banco de dados Hard Coded
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-ps1rl.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connectedUsers = {};
// Em uma aplicação em Produção a melhor formar
// de armazenar os usuário conectados e atraves
// de um banco exemplo: Redis

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);