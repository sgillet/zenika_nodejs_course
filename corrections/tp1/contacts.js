const data = require('./contacts.json');

/** Classe Contact */
class Contact {
  constructor(contact) {
    Object.assign(this, contact);
  }

  /** toString utilisant la concatenation es6 */
  toString() {
    return `${this.lastName.toUpperCase()} ${this.firstName}`;
  }
}

/* Fonction constructeur pour l'objet ContactService */
class ContactService {
  constructor() {
    this.contacts = data.map(contact => new Contact(contact));
  }

  /**
   * La méthode get renvoie le tableau de contacts
   */
  get() {
    return this.contacts;
  }

  print() {
    console.log(this.get().join(', '));
  }
}

/* Execution */
const myContacts = new ContactService();
myContacts.print();
