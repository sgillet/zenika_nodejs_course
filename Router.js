exports.route = (express, contactService) => {
  express.get('/rest/contacts', function (req, res) {
    contactService.read((err, data) => {
      if(err) {
        res.send(err)
      }
      res.send('data');
    });
  });
};
