var model        = require('../models/task');
var modelUser    = require('../models/user');
var modelProject = require('../models/project');
var nodemailer   = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sergiodxa@gmail.com',
        pass: ''
    }
});

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
      modelProject.getSingle(data.project, function (projectData) {
        modelUser.getSingle(projectData.projectLeader, function (userData) {
          var mailOptions = {
              from: 'TaskManager <taskmanager@company.com>',
              to: userData.email,
              subject: 'Task changed',
              text: 'The task: "' + data.taskName + '" changed to "' + data.stateName +'"',
              html: 'The task: <strong>' + data.taskName + '</strong> changed to <em>' + data.stateName + '</em>.<br><a href="http://localhost:3000/#/tasks/single/' + data.id + '" target="_blank">Check here</a>'
          };
          transporter.sendMail(mailOptions, function(error, info){
              if (error){
                  console.log(error);
              } else {
                  console.log('Message sent: ' + info.response);
              }
          });
        });
      });
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

exports.io = function (socket) {
  socket.on('get tasks', function () {
    model.getAll(function (tasksData) {
      socket.emit('return tasks', tasksData);
    });
  });

  socket.on('get task', function (id) {
    model.getSingle(id, function (taskData) {
      socket.emit('return task', taskData);
    });
  });

  socket.on('get tasks by user', function (userId) {
    model.getByUser(userId, function (taskData) {
      socket.emit('return tasks by user', taskData);
    });
  });

  socket.on('get tasks by project', function (projectId) {
    model.getByProject(projectId, function (taskData) {
      socket.emit('return tasks by project', taskData);
    });
  });

  socket.on('add task', function (data) {
    model.add(data, function (response) {
      if (response === 'Task added') {
        socket.emit('task added', 'Task created');
        model.getAll(function (tasksData) {
          socket.broadcast.emit('return tasks', tasksData);
        });
        model.getByProject(data.project, function (tasksData) {
          socket.broadcast.emit('return tasks by project', tasksData);
        });
        model.getByUser(data.userAssigned, function (tasksData) {
          socket.broadcast.emit('return tasks by user', tasksData);
        });
      } else if (response === false) {
        socket.emit('add task failed', 'An error has ocurred');
      }
    });
  });

  socket.on('edit task', function (data) {
    model.edit(data.id, data, function (response) {
      if (response === 'Task data edited') {
        socket.emit('task edited', response);
        model.getAll(function (tasksData) {
          socket.broadcast.emit('return tasks', tasksData);
        });
        model.getByProject(data.project, function (tasksData) {
          socket.broadcast.emit('return tasks by project', tasksData);
        });
        model.getByUser(data.userAssigned, function (tasksData) {
          socket.broadcast.emit('return tasks by user', tasksData);
        });

        modelProject.getSingle(data.project, function (projectData) {
          modelUser.getSingle(projectData.projectLeader, function (userData) {
            var mailOptions = {
              from: 'TaskManager',
              to: userData.email,
              subject: 'Task changed',
              text: 'The task: "' + data.taskName + '" changed to "' + data.stateName +'"',
              html: 'The task: <strong>' + data.taskName + '</strong> changed to <em>' + data.stateName + '</em>.<br><a href="http://localhost:3000/#/tasks/single/' + data.id + '" target="_blank">Check here</a>'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if(error){
                console.log(error);
              }else{
                console.log('Message sent: ' + info.response);
              }
            });
          });
        });

      } else if (response === false) {
        res.send('An error has ocurred');
      };
    });
  });

  socket.on('delete task', function (data) {
    model.erase(data.id, function (response) {
      if (response === 'Task deleted') {
        socket.emit('task deleted', response);
        model.getAll(function (tasksData) {
          socket.broadcast.emit('return tasks', tasksData);
        });
        model.getByProject(data.project, function (tasksData) {
          socket.broadcast.emit('return tasks by project', tasksData);
        });
        model.getByUser(data.userAssigned, function (tasksData) {
          socket.broadcast.emit('return tasks by user', tasksData);
        });
      } else if (response === false) {
        socket.emit('delete task failed', 'Error');
      }
    });
  });
}
