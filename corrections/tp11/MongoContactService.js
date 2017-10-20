const Contact = require('./Contact');
const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  id: Number,
  lastName: String,
  firstName: String,
  address: String,
  phone: String
});

const ContactModel = mongoose.model('Contact', contactSchema);

class MongoContacts {
  constructor() {
    mongoose.connect('mongodb://localhost/test');
  }

  get(callback) {
    ContactModel.find((error, mongoContacts) => {
      const contacts = mongoContacts.map(contact => new Contact(contact.toObject()));
      callback(contacts);
    });
  }

  getById(id, callback) {
    ContactModel.findOne({ id }, (error, mongoContact) => {
      callback(new Contact(mongoContact));
    });
  }

  add(lastName, firstName, callback) {
    ContactModel.findOne().sort('-id').exec((err, contact) => {
      const id = contact.id + 1;

      const newContact = new ContactModel({
        id,
        lastName,
        firstName
      });

      newContact.save((error, contact) => {
        if(callback) {
          callback(new Contact(contact));
        }
      });
    });
  }

  delete(id, callback) {
    ContactModel.remove({
      id
    }, () => {
      if(callback) {
        callback();
      }
    });
  }

  watch() {
    console.log('Watch not implemented for MongoContacts');
  }

  close() {
    mongoose.disconnect();
  }
}

module.exports = MongoContacts;
