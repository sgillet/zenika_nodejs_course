const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const socketio = require('socket.io');
const cluster = require('cluster');
const router = require('./Router');

const web = (myContacts) => {
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


const init = (myContacts, forkCount) => {
  if (cluster.isMaster) {
    console.log(`Démarrage du master avec ${forkCount} workers`);

    // Fork workers.
    for (let i = 0; i < forkCount; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker ${worker.process.pid} died`);
    });
  } else {
    console.log(`Démarrage du worker ${cluster.worker.id}`);

    web(myContacts);
  }
}

module.exports = init
