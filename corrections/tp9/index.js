#!/usr/bin/env node

const MongoContactService = require('./MongoContactService');
const cli = require('./Cli');

/* Execution */
const myContacts = new MongoContactService();
cli.init(myContacts);
