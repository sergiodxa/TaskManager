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

exports.add = function (req, res) {
  console.log(req);
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
  console.log(req);
};
