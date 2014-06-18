var model = require('../models/project');

exports.getAll = function (req, res) {
  model.getAll(function (projects) {
    res.send(projects);
  });
};

exports.getSingle = function (req, res) {
  var id = req.params.id;

  model.getSingle(id, function (project) {
    res.send(project);
  });
};

exports.getByClient = function (req, res) {
  var clientId = req.params.id;

  model.getByClient(clientId, function (projects) {
    if (projects === false) {
      res.send('Error');
    } else {
      res.send(projects);
    }
  });
};

exports.add = function (req, res) {
  var project = JSON.parse(req.query.project);

  model.add(project, function (response) {
    if (response === 'Project created') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    }
  });
};

exports.edit = function (req, res) {
  var id = req.params.id;
  var project = JSON.parse(req.query.project);

  model.edit(id, project, function (response) {
    if (response === 'Project edited') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    };
  });
};

exports.erase = function (req, res) {
  var id = req.params.id;

  model.erase(id, function (response) {
    if (response === 'Project deleted') {
      res.send('Project deleted');
    } else if (response === false) {
      res.send('Error');
    }
  })
};
