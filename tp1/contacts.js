'use strict';
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
      return new Contact(contact.id, contact.firstName, contact.lastName, contact.phone);
    });
  }

  get() {
    return this.contacts;
  }

  print() {
    this.get().map((contact) => {
      console.log(contact.toString());
    });
  }
}

let myContactService = new ContactService();
myContactService.print();
