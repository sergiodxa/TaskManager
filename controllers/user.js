var model = require('../models/user');

exports.getAll = function (req, res) {
  model.getAll(function (users) {
    res.send(users);
  });
};

exports.getSingle = function (req, res) {
  var id = req.params.id;

  model.getSingle(id, function (user) {
    res.send(user);
  });
};

exports.getOnlyScrumMasters = function (req, res) {
  model.getOnlyScrumMasters(function (users) {
    res.send(users);
  });
};

exports.add = function (req, res) {
  var user = JSON.parse(req.query.user);

  model.add(user, function (response) {
    if (response === 'User created') {
      res.send('User added');
    } else if (response === false) {
      res.send('An error has ocurred');
    }
  });
};

exports.edit = function (req, res) {
  var id = req.params.id;
  var user = JSON.parse(req.query.user);

  model.edit(id, user, function (response) {
    if (response === 'User data with pass edited' || response === 'Password wrong' || response === 'User data without pass edited') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    };
  });
};

exports.erase = function (req, res) {
  var id = req.params.id;

  model.erase(id, function (response) {
    if (response === 'User deleted') {
      res.send('User deleted');
    } else if (response === false) {
      res.send('Error');
    }
  })
};
