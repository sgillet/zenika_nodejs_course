const yargs = require('yargs');
const chalk = require('chalk');

class Contact {
  constructor(contact) {
    Object.assign(this, contact);
  }

  toString() {
    let lastName = this.lastName.toUpperCase();
    let firstName = this.firstName;

    if(yargs.argv.colors) {
      lastName = chalk.blue(lastName);
      firstName = chalk.red(firstName);
    }

    return `${lastName} ${firstName}`;
  }
}

module.exports = Contact;
