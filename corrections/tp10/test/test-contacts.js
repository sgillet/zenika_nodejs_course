const chai = require('chai');
const sinon = require('sinon');
const assert = require('assert')
const ContactService = require('../ContactService')

chai.should();

/* eslint-env mocha */

describe('Contacts object', () => {
  let myContacts;

  describe('toString', () => {
    beforeEach(() => {
      myContacts = new ContactService();
    });

    it('should return lastName in upper case', () => {
      const contact = myContacts.contacts[0]
      const spy = sinon.spy(contact, 'toString');
      const string = contact.toString();
      const test = /^[A-Z]* [A-Za-z]*/.test(string);

      // L'un ou l'autre
      assert(test);
      test.should.be.true;
      string.should.match(/^[A-Z]* [A-Za-z]*/);

      spy.calledOnce.should.be.true;
    })
  })


});
