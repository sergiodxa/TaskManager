var modelo = require('../models/miembro');

exports.getAll = function (req, res) {
  modelo.getAll(function (miembros) {
    res.send(miembros);
  });
};

exports.getSingle = function (req, res) {
  var id = req.params.id;

  modelo.getSingle(id, function (miembro) {
    res.send(miembro);
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
