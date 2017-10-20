const data = require('./contacts.json');

/* Fonction constructeur pour l'objet Contact */
function Contact(id, lastName, firstName, address, phone) {
  this.id = id;
  this.lastName = lastName;
  this.firstName = firstName;
  this.address = address;
  this.phone = phone;
}

/* Définition de la méthode toString dans le prototype de l'objet Contact*/
Contact.prototype.toString = function () {
  const lastName = this.lastName.toUpperCase();
  const firstName = this.firstName;

  return lastName + ' ' + firstName;
};


/* Fonction constructeur pour l'objet ContactService */
function ContactService() {

  this.contacts = data.map(function (contact) {
    return new Contact(contact.id, contact.lastName, contact.firstName, contact.address, contact.phone);
  });

  /**
   * La méthode get renvoie le tableau de contacts
   */
  this.get = function () {
    return this.contacts;
  };

  /*
   * La méthode print ne fait appel qu'à la méthode get définie précédemment
   * en définissant l'action que nous désirons exécuter sur les éléments de
   * de notre tableau de contacts
   */
  this.print = function print() {
    console.log(this.get().join(', '));
  };
}


/* Execution */
const myContacts = new ContactService();
myContacts.print();
