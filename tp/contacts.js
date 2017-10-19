'use strict';
const _ = require('lodash');
const chalk = require('chalk');
const yargs = require("yargs");
const fs = require("fs");


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

class FileContactService {
  constructor() {
    this.path = 'contacts.json';
  }

  read(callback) {
    console.log('read contacts');
    fs.readFile(this.path, (err, data) => {
      if(err) {
        console.error(err);
        return;
      }
      this.contacts = JSON.parse(data).map((contact) => {
        return new Contact(contact);
      });

      return callback(err, this.contacts);
    });
  }

  add(firstName, lastName, callback) {
    console.log('start adding contacts');
    this.read((err, contacts) => {
      if(err) {
        console.error(err);
        return;
      }
      console.log('before');
      console.log(contacts);
      let contactToAdd = new Contact({
        'id': contacts.length,
        'firstName': firstName,
        'lastName': lastName,
      });
      console.log('after');
      console.log(contacts);
      contacts.push(contactToAdd);
      this.write(JSON.stringify(contacts));
    });

  }

  write(contacts) {
    console.log('write contacts');
    fs.writeFile(this.path, contacts, (err, data) => {
      if(err) {
        console.error(err);
        return;
      }
      this.read((err, contacts) => {
        console.log(contacts);
      })
    })
  }

  delete(id) {
    this.read((err, contacts) => {
      if(err) {
        console.error(err);
        return;
      }
      let contactsFiltered = contacts.filter((contact) => {
        return contact.id !== id;
      });
      this.write(JSON.stringify(contactsFiltered));
    });
  }

  get() {
    return this.contacts;
  }

  print() {
    this.contacts.forEach((contact) => {
      console.log(contact);
    });
  }
}


let contactService = new FileContactService();

yargs
  .command({
    command: 'add',
    desc: 'Add contact',
    builder: (ygs) => {
      ygs
        .option('firstName', {
          alias: 'f',
          desc: 'Contact\'s first name',
          demand: true,
          type: 'string'
        })
        .option('lastName', {
          alias: 'l',
          desc: 'Contact\'s last name',
          demand: true,
          type: 'string'
        })
    },
    handler: argv => contactService.add(argv.firstName, argv.lastName, () => {
      contactService.print();
    })
  })
  .command({
    command: 'delete',
    desc: 'Delete contact',
    builder: (ygs) => {
      ygs
        .option('id', {
          alias: 'i',
          desc: 'Contact\'s id',
          demand: true,
          type: 'string'
        })
    },
    handler: argv => contactService.delete(Number(argv.id), () => {
      contactService.print();
    })
  })
  .help()
  .argv;
