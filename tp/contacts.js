'use strict';
const _ = require('lodash');
const chalk = require('chalk');
var yargs = require("yargs");
const data = require('./contacts.json');


class Contact {
  constructor(id, firstName, lastName, phone) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }

  toString() {
    if(yargs.argv.colors) {
      return `${chalk.red(this.firstName)} ${chalk.blue(this.lastName)}, phone: ${this.phone}. id: ${this.id}`;
    } else {
      return `${this.firstName} ${this.lastName}, phone: ${this.phone}. id: ${this.id}`;
    }
  }
}

class ContactService {
  constructor() {
    this.contacts = data.map((contact) => {
      return new Contact(contact.id, contact.firstName, contact.lastName, contact.phone);
    });
  }

  print() {
    this.contacts.map((contact) => {
      console.log(contact.toString());
    });
  }
}

let myContactService = new ContactService();
if(yargs.argv.list) {
  myContactService.print();
}
