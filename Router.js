exports.route = (express, contactService) => {
  express.get('/rest/contacts', function (req, res) {
    contactService.read((err, data) => {
      if(err) {
        res.send(err)
      }
      res.send(data);
    });
  });
  express.get('/rest/contacts/:id', function (req, res) {
    const id = Number(req.params.id);
    contactService.get(id, (err, data) => {
      if(err) {
        res.send(err)
      }
      res.send(data);
    });
  });
};
