const data = require('./contacts.json');

const getFullName = contact => `${contact.lastName.toUpperCase()} ${contact.firstName}`;

const print = (contacts) => {
  console.log(contacts.map(getFullName).join(', '));
};

print(data);
