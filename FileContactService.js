const Contact = require('./Contact');
const fs = require("fs");

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


module.exports = FileContactService;
