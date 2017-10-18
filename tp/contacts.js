'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const data = require('./contacts.json');

class Contact {
  constructor(id, firstName, lastName, phone) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
  }

  toString() {
    return `${this.firstName} ${this.lastName}, phone: ${this.phone}. id: ${this.id}`
  }
}

class ContactService {
  constructor() {
    this.contacts = data.map((contact) => {
      return new Contact(contact.id, chalk.blue(contact.firstName), chalk.red(contact.lastName), contact.phone);
    });
  }

  print() {
    this.contacts.map((contact) => {
      console.log(contact.toString());
    });
  }
}

let myContactService = new ContactService();
myContactService.print();
