var myconnection    = require('../modules/myconnection');
var assignStateName = require('../modules/assignstatename');
var user            = require('./user.js');

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
        var userId = task.userAsigned-1;
        if (userId >= 0) {
        // obtenemos los datos del usuario para saber el nombre
          user.getSingle(task.userAsigned, function (userData) {
            task.userAsignedName = userData.fullName;
            task = assignStateName(task);
            callback(task);
          });
        } else {
            task.userAsignedName = null;
            task = assignStateName(task);
          callback(task);
        }
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
          var userId = tasks[i].userAsigned-1;
          if (userId >= 0) {
            tasks[i].userAsignedName = usersData[userId].fullName;
          } else {
            tasks[i].userAsignedName = null;
          }
          tasks[i] = assignStateName(tasks[i]);
        }
        callback(tasks);
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
          var userId = tasks[i].userAsigned-1;
          console.log(userId);
          if (userId >= 0) {
            tasks[i].userAsignedName = usersData[userId].fullName;
          } else {
            tasks[i].userAsignedName = null;
          }
          tasks[i] = assignStateName(tasks[i]);
        }
        callback(tasks);
      });
    });
  });
};

// método para obtener todas las tareas de un usuario
exports.getByUser = function (userId, callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM tasks WHERE userAsigned = ' + userId;
    pool.query(query, function (err, tasks) {
      if (err) {
        callback(false);
        return;
      }
      // obtenemos los datos del usuario para saber el nombre
      user.getSingle(userId, function (userData) {
        for (var i = 0; i < tasks.length; ++i) {
          var userId = tasks[i].userAsigned-1;
          console.log(userId);
          if (userId >= 0) {
            tasks[i].userAsignedName = usersData[userId].fullName;
          } else {
            tasks[i].userAsignedName = null;
          }
          tasks[i] = assignStateName(tasks[i]);
        }
        callback(tasks);
      });
    });
  });
};

// método para crear una nueva tarea
exports.add = function (task, callback) {
  myconnection(function (pool) {
    var query = 'INSERT INTO tasks (name, description, project, priority, estimatedTime, requiredTime, userAsigned, state) VALUES (' + pool.escape(user.name) + ', ' + pool.escape(user.description) + ', ' + pool.escape(user.project) + ', ' + pool.escape(user.priority) + ', ' + pool.escape(user.estimatedTime) + ', ' + pool.escape(user.requiredTime) +', ' + pool.escape(user.userAsigned) +', ' + pool.escape(user.state) +')';
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
    var query = 'UPDATE tasks SET name = ' + pool.escape(task.name) + ', description = ' + pool.escape(task.description) + ', project = ' + pool.escape(task.project) + ', priority = ' + pool.escape(task.priority) + ', estimatedTime = ' + pool.escape(task.estimatedTime) + ', requiredTime = ' + pool.escape(task.requiredTime) + ', userAsigned = ' + pool.escape(task.userAsigned) + ', state = ' + pool.escape(task.state) + ' WHERE id = ' + id;

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
