#!/usr/bin/env node

const chalk = require('chalk');
const yargs = require('yargs');
const _ = require('lodash');
const fs = require('fs');

/** Classe Contact */
class Contact {
  constructor(contact) {
    Object.assign(this, contact);
  }

  toString() {
    let lastName = this.lastName.toUpperCase();
    let firstName = this.firstName;

    if (yargs.argv.c) {
      lastName = chalk.blue(lastName);
      firstName = chalk.red(firstName);
    }
    return `${lastName} ${firstName}`;
  }

}

/** Classe ContactService */
class ContactService {
  constructor() {
    this.contacts = data.map(contact => new Contact(contact));
  }

  get() {
    return this.contacts;
  }

  print() {
    console.log(this.get().join(', '));
  }
}

const path = 'contacts.json';
class FileContactService {

  read(callback) {
    fs.readFile(path, (err, raw) => {
      if (err) {
        console.error('error loading file', err);
      }
      try {
        const data = JSON.parse(raw);
        const contacts = data.map(contact => new Contact(contact));

        if (callback) {
          callback(contacts);
        }
      } catch (error) {
        console.error('error parsing', error);
      }
    });
  }

  get(callback) {
    this.read(callback)
  }

  write(contacts, callback) {
    fs.writeFile(path, JSON.stringify(contacts), callback);
  }

  add(firstName, lastName, callback) {
    this.read((contacts) => {
      contacts.push(
        new Contact({
          id: _.last(contacts).id + 1,
          lastName,
          firstName,
        })
      );

      this.write(contacts, callback);
    });
  }

  delete(id, callback) {
    this.read((contacts) => {
      this.write(contacts.filter(c => c.id !== id), callback);
    });
  }

  watch() {
    this.read((referenceContacts) => {
      fs.watch(path, () => {
        this.read((newContacts) => {
          console.log('watched', _.differenceWith(referenceContacts, newContacts, _.isEqual));
        });
      });
    });
  }

  print() {
    this.get((data) => console.log(data.join(', ')));
  }
}


/* Instanciation */
const myContacts = new FileContactService();

/* Parsing command */
yargs
  .version('0.0.0')
  .option('c', {
    alias: 'colors',
    desc: 'Use colors in console',
  })
  .help()
  .global('c');

yargs.command({
  command: 'list',
  desc: 'List all contacts',
  handler: () => myContacts.print(),
}).command({
  command: 'add',
  desc: 'Add contact',
  builder: ygs => {
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
        type: 'string',
      })
  },
  handler: argv => myContacts.add(argv.firstName, argv.lastName, () => myContacts.print())
}).command({
  command: 'delete',
  desc: 'Delete contact',
  builder: ygs => {
    ygs
      .option('id', {
        alias: 'i',
        desc: 'Contact\'s id',
        demand: true,
        type: 'number',
      })
  },
  handler: argv => myContacts.delete(argv.id, () => myContacts.print()),

}).command({
  command: 'watch',
  desc: 'Watch contacts',
  handler: () => myContacts.watch(),
}).argv;
