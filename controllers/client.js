var model = require('../models/client');

exports.getAll = function (req, res) {
  model.getAll(function (clients) {
    res.send(clients);
  });
};

exports.getSingle = function (req, res) {
  var id = req.params.id;

  model.getSingle(id, function (client) {
    res.send(client);
  });
};

exports.add = function (req, res) {
  var user = JSON.parse(req.query.user);

  model.add(user, function (response) {
    if (response === 'Client added') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    }
  });
};

exports.edit = function (req, res) {
  var id = req.params.id;
  var user = JSON.parse(req.query.user);

  model.edit(id, user, function (response) {
    if (response === 'Client edited') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    };
  });
};

exports.erase = function (req, res) {
  var id = req.params.id;

  model.erase(id, function (response) {
    if (response === 'Client deleted') {
      res.send(response);
    } else if (response === false) {
      res.send('Error');
    }
  })
};
