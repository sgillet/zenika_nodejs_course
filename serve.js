const FileContactService = require('./FileContactService');
const server = require('./Server');

let contactService = new FileContactService();
server.init(contactService)
