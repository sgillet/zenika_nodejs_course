#!/usr/bin/env node

const FileContactService = require('./FileContactService');
const cli = require('./Cli');

/* Execution */
const myContacts = new FileContactService();
cli.init(myContacts);
