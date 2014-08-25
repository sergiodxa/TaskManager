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

exports.io = function (socket) {
  socket.on('get projects', function () {
    model.getAll(function (projectsData) {
      socket.emit('return projects', projectsData);
    });
  });

  socket.on('get project', function (id) {
    model.getSingle(id, function (projectData) {
      socket.emit('return project', projectData);
    });
  });

  socket.on('get projects by client', function (clientId) {
    model.getByClient(clientId, function (projects) {
      if (projects !== false) {
        socket.emit('return projects by client', projects);
      }
    });
  });

  socket.on('add project', function (data) {
    model.add(data, function (response) {
      if (response === 'Project created') {
        socket.emit('project added', 'Project created');
        model.getAll(function (projectsData) {
          socket.broadcast.emit('return projects', projectsData);
        });
      } else if (response === false) {
        socket.emit('add project failed', 'An error has ocurred');
      }
    });
  });

  socket.on('edit project', function (data) {
    model.edit(data.id, data.data, function (response) {
      if (response === 'Project edited') {
        socket.emit('project edited', 'Project edited');
        model.getAll(function (projectsData) {
          socket.broadcast.emit('return projects', projectsData);
        });
      } else {
        socket.emit('edit project failed', 'An error has ocurred');
      }
    });
  });

  socket.on('delete project', function (id) {
    model.erase(id, function (response) {
      if (response === 'Project deleted') {
        socket.emit('project deleted', 'Project deleted');
        model.getAll(function (projectsData) {
          socket.broadcast.emit('return projects', projectsData);
        });
      } else if (response === false) {
        socket.emit('delete project failed', 'Error');
      }
    });
  });
};
