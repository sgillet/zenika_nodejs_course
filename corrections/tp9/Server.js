const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const socketio = require('socket.io');
const router = require('./Router');

function web(myContacts) {
  const app = express();
  const server = require('http').Server(app);
  const io = socketio.listen(server);

  // Middleware
  app.use(bodyParser.json());
  app.use(serveStatic('./public'));

  // Routes
  router(app, myContacts, io);

  // Listen
  server.listen(1234);
}

module.exports = web;
