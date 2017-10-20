const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = require('./Router');
const app = express();

exports.init = function(contactService) {
  console.log('init function');
  // app.use(expres.static('./public'));
  app.use(bodyParser.json());
  app.use(logger('dev'));
  router.route(app, contactService);

  app.listen(8042);
}
