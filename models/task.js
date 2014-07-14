var myconnection    = require('../modules/myconnection');
var assignStateName = require('../modules/assignstatename');
var user            = require('./user.js');
var project         = require('./project.js');

// método para obtener todos los datos de una tarea
exports.getSingle = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM tasks WHERE id = ' + id;
    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }
      if (response.length === 1) {
        var task = response[0];
        var userId = task.userAssigned - 1;
        if (userId >= 0) {
        // obtenemos los datos del usuario para saber el nombre
          user.getSingle(task.userAssigned, function (userData) {
            task.userAssignedName = userData.fullName;
            task = assignStateName(task);
            project.getSingle(task.project, function (projectData) {
              task.projectName = projectData.name;
              callback(task);
            });
          });
        } else {
          task.userAssignedName = null;
          task = assignStateName(task);
          project.getSingle(task.project, function (projectData) {
            task.projectName = projectData.name;
            callback(task);
          });      }
      } else {
        callback('That task doesn\'t exist');
      }
    });
  });
};

// método para obtener los datos de todas los tareas
exports.getAll = function (callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM tasks';
    pool.query(query, function (err, tasks) {
      if (err) {
        callback(false);
        return;
      }
      // obtenemos los datos de todos los usuarios para saber sus nombres
      user.getAll(function (usersData) {
        for (var i = 0; i < tasks.length; ++i) {
          var userId = tasks[i].userAssigned - 1;
          if (userId >= 0) {
            tasks[i].userAssignedName = usersData[userId].fullName;
          } else {
            tasks[i].userAssignedName = null;
          }
          tasks[i] = assignStateName(tasks[i]);
        }
        project.getAll(function (projectData) {
          for (var i = 0; i < tasks.length; ++i) {
            var projectId = tasks[i].project - 1;
            tasks[i].projectName = projectData[projectId].name;
          }
          callback(tasks);
        });
      });
    });
  });
};

// método para obtener todas las tareas de un proyecto
exports.getByProject = function (projectId, callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM tasks WHERE project = ' + projectId;
    pool.query(query, function (err, tasks) {
      if (err) {
        callback(false);
        return;
      }
      // obtenemos los datos de todos los usuarios para saber sus nombres
      user.getAll(function (usersData) {
        for (var i = 0; i < tasks.length; ++i) {
          var userId = tasks[i].userAssigned - 1;
          if (userId >= 0) {
            tasks[i].userAssignedName = usersData[userId].fullName;
          } else {
            tasks[i].userAssignedName = null;
          }
          tasks[i] = assignStateName(tasks[i]);
        }
        project.getSingle(projectId, function (projectData) {
          for (var i = 0; i < tasks.length; ++i) {
            tasks[i].projectName = projectData.name;
          }
          callback(tasks);
        });
      });
    });
  });
};

// método para obtener todas las tareas de un usuario
exports.getByUser = function (userId, callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM tasks WHERE userAssigned = ' + userId;
    pool.query(query, function (err, tasks) {
      if (err) {
        callback(false);
        return;
      }
      // obtenemos los datos del usuario para saber el nombre
      user.getSingle(userId, function (userData) {
        for (var i = 0; i < tasks.length; ++i) {
          if (userId >= 0) {
            tasks[i].userAssignedName = userData.fullName;
          } else {
            tasks[i].userAssignedName = null;
          }
          tasks[i] = assignStateName(tasks[i]);
        }
        project.getAll(function (projectData) {
          for (var i1 = 0; i1 < tasks.length; ++i1) {
            var projectId = parseInt(tasks[i1].project);
            var project;
            for (var i2 = 0; i2 < projectData.length; ++i2) {
              if (projectData[i2].id === projectId) {
                project = i2;
              };
            };
            tasks[i1].projectName = projectData[project].name;
          };
          callback(tasks);
        });
      });
    });
  });
};

// método para crear una nueva tarea
exports.add = function (task, callback) {
  myconnection(function (pool) {
    var query = 'INSERT INTO tasks (name, description, project, priority, estimatedTime, requiredTime, userAssigned, state) VALUES (' + pool.escape(task.name) + ', ' + pool.escape(task.description) + ', ' + task.project + ', ' + task.priority + ', ' + task.estimatedTime + ', ' + task.requiredTime +', ' + task.userAssigned +', ' + task.state +')';
    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }
      callback('Task added');
    });
  });
};

// método para modificar un user
exports.edit = function (id, task, callback) {
  myconnection(function (pool) {
    var query = 'UPDATE tasks SET name = ' + pool.escape(task.name) + ', description = ' + pool.escape(task.description) + ', project = ' + pool.escape(task.project) + ', priority = ' + pool.escape(task.priority) + ', estimatedTime = ' + pool.escape(task.estimatedTime) + ', requiredTime = ' + pool.escape(task.requiredTime) + ', userAssigned = ' + pool.escape(task.userAssigned) + ', state = ' + pool.escape(task.state) + ' WHERE id = ' + id;

    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
      }
      callback('Task data edited');
    });
  });
};

// método para eliminar un user
exports.erase = function (id, callback) {
  myconnection(function (pool) {
    var query = 'DELETE FROM tasks WHERE id = ' + id;

    pool.query(query, function (err, response) {
      if (err) {
        callback(false)
      }
      callback('Task deleted');
    });
  });
};