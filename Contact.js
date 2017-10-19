class Contact {
  constructor(contact) {
    this.id = contact.id || '';
    this.firstName = contact.firstName || '';
    this.lastName = contact.lastName || '';
    this.address = contact.address || '';
    this.phone = contact.phone || '';
  }

  toString() {
    if(yargs.argv.colors) {
      return `${chalk.red(this.firstName)} ${chalk.blue(this.lastName)}, phone: ${this.phone}. id: ${this.id}`;
    } else {
      return `${this.firstName} ${this.lastName}, phone: ${this.phone}. id: ${this.id}`;
    }
  }
}

module.exports = Contact;
