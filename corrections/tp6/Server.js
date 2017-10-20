const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const router = require('./Router');

function web(myContacts) {
  const app = express();

  // Middleware
  app.use(bodyParser.json());
  app.use(serveStatic('./public'));

  // Routes
  router(app, myContacts);

  // Listen
  app.listen(1234);
}

module.exports = web;
