const fs = require('fs');
const Contact = require('./Contact');
const _ = require('lodash');
const write = require('./WriteImplems');
const path = 'contacts.json';

class FileContactService {
  constructor() {
    this.write = write.asyncAwait;
  }

  read(callback) {
    fs.readFile(path, (err, raw) => {
      if (err) {
        console.error('error loading file', err);
      }
      try {
        const data = JSON.parse(raw);
        const contacts = data.map(contact => new Contact(contact));

        !!callback && callback(contacts);

      } catch (error) {
        console.error('error parsing', error);
      }
    });
  }

  get(callback) {
    this.read(callback);
  }

  add(firstName, lastName, callback) {
    this.read((contacts) => {
      contacts.push(
        new Contact({
          id: contacts[contacts.length - 1].id + 1,
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

module.exports = FileContactService;
