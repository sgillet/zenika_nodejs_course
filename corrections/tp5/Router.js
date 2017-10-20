module.exports = (app, myContacts) => {
  app.get('/rest/contacts', (req, res) => {
    myContacts.get(contacts => res.send(contacts));
  });

  app.get('/rest/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);

    myContacts.get((contacts) => {
      const contact = contacts.find(c => c.id === id);

      res.send(contact);
    });
  });

  app.post('/rest/contacts', (req, res) => {
    myContacts.add(req.body.firstName, req.body.lastName, () => {
      res.sendStatus(200);
    });
  });

  app.put('/rest/contacts/:id', (req, res) => {
    const id = parseInt(req.params.id);

    myContacts.delete(id, () => {
      myContacts.add(req.body.firstName, req.body.lastName, () => {
        res.sendStatus(200);
      });
    });
  });
};
