var mongoose = require('mongoose');
var Project  = require('../models/ModelProject');

exports.io = function (socket) {

  // event for get all projects
  socket.on('get projects', function () {
    Project
      .find()
      .populate('owner')
      .populate('projectLeader', '-pass')
      .exec(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          socket.emit('return projects', res);
        }
      }
    );
  });

  // event for get a single project
  socket.on('get project', function (id) {
    Project
      .findById(mongoose.Types.ObjectId(id))
      .populate('owner')
      .populate('projectLeader', '-pass')
      .exec(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          socket.emit('return project', res);
        };
      }
    );
  });

  // event for get all project by client
  socket.on('get projects by client', function (clientId) {
    Project
      .find({ owner: mongoose.Types.ObjectId(clientId) })
      .populate('owner')
      .populate('projectLeader', '-pass')
      .exec(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          socket.emit('return projects by client', res);
        }
      }
    );
  });

  // event for get a single project without populate
  socket.on('get project without populate', function (id) {
    Project
      .findById(mongoose.Types.ObjectId(id))
      .exec(function (err, res) {
        if (err) {
          console.error(err);
        } else {
          socket.emit('return project without populate' , res);
        };
      }
    );
  });

  // event for add a new project
  socket.on('add project', function (data) {
    var instance = new Project({
      projectName  : data.projectName,
      description  : data.description,
      releaseDate  : data.releaseDate,
      githubRepo   : data.githubRepo || null,
      owner        : mongoose.Types.ObjectId(data.owner),
      projectLeader: mongoose.Types.ObjectId(data.projectLeader)
    });

    instance.save(function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('add project failed', 'An error has ocurred');
      } else {
        socket.emit('project added', 'Project added');

        Project
          .find()
          .populate('owner')
          .populate('projectLeader', '-pass')
          .exec(function (err, res) {
            if (err) {
              console.error(err);
            } else {
              socket.broadcast.emit('return projects', res);
            }
          }
        );
        Project
          .find({ owner: mongoose.Types.ObjectId(data.owner) })
          .populate('owner')
          .populate('projectLeader', '-pass')
          .exec(function (err, res) {
            if (err) {
              console.error(err);
            } else {
              socket.broadcast.emit('return projects by client', res);
            }
          }
        );
      };
    });
  });

  // event for edit a project
  socket.on('edit project', function (data) {
console.log(data.data.owner);
    Project.findByIdAndUpdate(mongoose.Types.ObjectId(data.id), data.data, function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('edit project failed', 'An error has ocurred');
      } else {
        socket.emit('project edited', 'Project edited');

        Project
          .find()
          .populate('owner')
          .populate('projectLeader', '-pass')
          .exec(function (err, res) {
            if (err) {
              console.error(err);
            } else {
              socket.broadcast.emit('return projects', res);
            }
          }
        );

        Project
          .find({ owner: mongoose.Types.ObjectId(data.data.owner) })
          .populate('owner')
          .populate('projectLeader', '-pass')
          .exec(function (err, res) {
            if (err) {
              console.error(err);
            } else {
              socket.broadcast.emit('return projects by client', res);
            }
          }
        );
      };
    });
  });

  // event for erase a project
  socket.on('delete project', function (data) {
    Project.findByIdAndRemove(mongoose.Types.ObjectId(data.id), function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('delete project failed', 'Error');
      } else {
        socket.emit('project deleted', 'Project deleted');

        Project
          .find()
          .populate('owner')
          .populate('projectLeader', '-pass')
          .exec(function (err, res) {
            if (err) {
              console.error(err);
            } else {
              socket.broadcast.emit('return projects', res);
            }
          }
        );

        Project
          .find({ owner: mongoose.Types.ObjectId(data.data.owner._id) })
          .populate('owner')
          .populate('projectLeader', '-pass')
          .exec(function (err, res) {
            if (err) {
              console.error(err);
            } else {
              socket.broadcast.emit('return projects by client', res);
            }
          }
        );
      };
    });
  });

};
