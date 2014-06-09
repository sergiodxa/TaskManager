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
  console.log(req);
};

exports.erase = function (req, res) {
  console.log(req);
};
