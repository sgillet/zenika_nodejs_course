const FileContactService = require('./FileContactService');
const cli = require('./Cli');

let contactService = new FileContactService();
cli.init(contactService);
