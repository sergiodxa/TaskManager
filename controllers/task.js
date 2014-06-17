var model = require('../models/task');

exports.getAll = function (req, res) {
  model.getAll(function (tasks) {
    res.send(tasks);
  });
};

exports.getSingle = function (req, res) {
  var id = req.params.id;

  model.getSingle(id, function (task) {
    if (task === false) {
      res.send('Error');
    } else {
      res.send(task);
    }
  });
};

exports.getByUser = function (req, res) {
  var userId = req.params.id;

  model.getByUser(userId, function (tasks) {
    if (tasks === false) {
      res.send('Error');
    } else {
      res.send(tasks);
    }
  });
};

exports.getByProject = function (req, res) {
  var projectId = req.params.id;

  model.getByProject(projectId, function (tasks) {
    if (tasks === false) {
      res.send('Error');
    } else {
      res.send(tasks);
    }
  });
};

exports.add = function (req, res) {
  var task = JSON.parse(req.query.task);

  model.add(task, function (response) {
    if (response === 'Task added') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    }
  });
};

exports.edit = function (req, res) {
  var id = req.params.id;
  var task = JSON.parse(req.query.task);

  model.edit(id, task, function (response) {
    if (response === 'Task data edited') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    };
  });
};

exports.erase = function (req, res) {
  var id = req.params.id;

  model.erase(id, function (response) {
    if (response === 'Task deleted') {
      res.send(response);
    } else if (response === false) {
      res.send('Error');
    }
  })
};
