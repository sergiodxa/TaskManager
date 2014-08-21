var mongoose   = require('mongoose');
var nodemailer = require('nodemailer');
var Task       = require('../models/ModelTask');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sergiodxa@gmail.com',
        pass: ''
    }
});

exports.io = function (socket) {

  // event for get all tasks
  socket.on('get tasks', function () {
    Task
      .find()
      .populate('project')
      .populate('userAssigned', '-pass')
      .exec(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          socket.emit('return tasks', res);
        }
      }
    );
  });

  // event for get a single task
  socket.on('get task', function (id) {
    Task
      .findById(mongoose.Types.ObjectId(id))
      .populate('project')
      .populate('userAssigned', '-pass')
      .exec(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          socket.emit('return task', res);
        };
      }
    );
  });

  //event for get all task by user
  socket.on('get tasks by user', function (userId) {
    Task
      .find({ userAssigned: mongoose.Types.ObjectId(userId) })
      .populate('project')
      .populate('userAssigned', '-pass')
      .exec(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          socket.emit('return tasks by user', res);
        }
      }
    );
  });

  //event for get all task by project
  socket.on('get tasks by project', function (projectId) {
    Task
      .find({ project: mongoose.Types.ObjectId(projectId) })
      .populate('project')
      .populate('userAssigned', '-pass')
      .exec(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          socket.emit('return tasks by project', res);
        }
      }
    );
  });

  // event for add a new task
  socket.on('add task', function (data) {
    var instance = new Task({
      taskName     : data.taskName,
      description  : data.description,
      priority     : data.priority,
      estimatedTime: data.estimatedTime,
      requiredTime : data.estimatedTime || null,
      state        : data.state,
      userAssigned : mongoose.Types.ObjectId(data.userAssigned),
      project      : mongoose.Types.ObjectId(data.project)
    });

    instance.save(function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('add task failed', 'An error has ocurred');
      } else {
        socket.emit('task added', 'Task added');
        Task.find(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            socket.broadcast.emit('return tasks', res);
          }
        });
      };
    });
  });

  // event for edit a task
  socket.on('edit task', function (data) {
    Task.findByIdAndUpdate(mongoose.Types.ObjectId(data.id), data.data, function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('edit task failed', 'An error has ocurred');
      } else {
        socket.emit('task edited', 'Task edited');
        Task.find(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            socket.broadcast.emit('return tasks', res);
          }
        });
      };
    });
  });

  // event for erase a task
  socket.on('delete task', function (id) {
    Task.findByIdAndRemove(id, function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('delete task failed', 'Error');
      } else {
        socket.emit('task deleted', 'Task deleted');
        Task.find(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            socket.broadcast.emit('return tasks', res);
          }
        });
      };
    });
  });

};
