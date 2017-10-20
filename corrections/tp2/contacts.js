#!/usr/bin/env node
const data = require('./contacts.json');
const chalk = require('chalk');
const yargs = require('yargs');
const _ = require('lodash');

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

/* Instanciation de 'ContactService' */
const myContacts = new ContactService();

/* Parsing yargs */
yargs
  // Définition de la verison
  .version('0.0.0')
  // Ajout d'une option 'c' -> colors
  .option('c', {
    alias: 'colors',
    desc: 'Use colors in console'
  })
  // Generateur de l'aide
  .help()
  // L'option 'c' est une option globale
  // - elle fonctionne pour toutes les commandes
  .global('c')

yargs
// Définition d'une commande list qui appelle 'myContacts.print()'
  .command({
    command: 'list',
    aliases: 'ls',
    desc: 'List all contacts',
    handler: () => myContacts.print(),
  })

// Yargs est exécuté
yargs.argv;
