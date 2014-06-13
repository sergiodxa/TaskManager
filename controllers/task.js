var model = require('../models/task');

exports.getAll = function (req, res) {
  model.getAll(function (tasks) {
    res.send(tasks);
  });
};

exports.getSingle = function (req, res) {
  var id = req.params.id;

  model.getSingle(id, function (task) {
    res.send(task);
  });
};

exports.getByUser = function (req, res) {
  var userId = req.params.id;

  model.getByUser(userId, function (tasks) {
    res.send(tasks);
  });
};

exports.getByProject = function (req, res) {
  var projectId = req.params.id;

  model.getByProject(projectId, function (tasks) {
    res.send(tasks);
  });
};

exports.add = function (req, res) {
  var task = JSON.parse(req.query.task);

  model.add(task, function (response) {
    if (response === 'Task added') {
      res.send('Task added');
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
