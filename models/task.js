var myconnection    = require('../modules/myconnection');
var assignStateName = require('../modules/assignstatename');

// método para obtener todos los datos de una tarea
exports.getSingle = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT tasks.id, taskName, tasks.description, project, priority, estimatedTime, requiredTime, userAssigned, state, users.firstName, users.lastName, projects.projectName FROM tasks LEFT JOIN users ON tasks.userAssigned = users.id LEFT JOIN projects ON tasks.project = projects.id WHERE tasks.id = ' + id + ' GROUP BY tasks.id';
    pool.query(query, function (err, tasks) {
      if (err) { // en caso de error
        callback(false);
        return;
      } else if (tasks.length === 1) { // respuesta con los datos
        var task = tasks[0];
        task.fullName = task.firstName + ' ' + task.lastName;
        task = assignStateName(task);
        callback(task);
      } else { // En caso de no encontrarse nada
        callback('That task doesn\'t exist');
      };
    });
  });
};

// método para obtener los datos de todas los tareas
exports.getAll = function (callback) {
  myconnection(function (pool) {
    var query = 'SELECT tasks.id, taskName, tasks.description, project, priority, estimatedTime, requiredTime, userAssigned, state, users.firstName, users.lastName, projects.projectName FROM tasks LEFT JOIN users ON tasks.userAssigned = users.id LEFT JOIN projects ON tasks.project = projects.id GROUP BY tasks.id';
    pool.query(query, function (err, tasks) {
      if (err) { // en caso de error
        callback(false);
        return;
      } else if (tasks.length > 0) { // respuesta con los datos
        for (var i = 0; i < tasks.length; ++i) {
          tasks[i].fullName = tasks[i].firstName + ' ' + tasks[i].lastName;
          tasks[i] = assignStateName(tasks[i]);
        };
        callback(tasks);
      } else {
        callback('No tasks');
      };
    });
  });
};

// método para obtener todas las tareas de un proyecto
exports.getByProject = function (projectId, callback) {
  myconnection(function (pool) {
    var query = 'SELECT tasks.id, taskName, tasks.description, project, priority, estimatedTime, requiredTime, userAssigned, state, users.firstName, users.lastName, projects.projectName FROM tasks LEFT JOIN users ON tasks.userAssigned = users.id LEFT JOIN projects ON tasks.project = projects.id WHERE project = ' + projectId + ' GROUP BY tasks.id'
    pool.query(query, function (err, tasks) {
      if (err) { // en caso de error
        callback(false);
        return;
      } else if (tasks.length > 0) { // respuesta con los datos
        for (var i = 0; i < tasks.length; ++i) {
          tasks[i].fullName = tasks[i].firstName + ' ' + tasks[i].lastName;
          tasks[i] = assignStateName(tasks[i]);
        }
        callback(tasks);
      } else {
        callback('This project doesn\'t have any tasks.');
      };
    });
  });
};

// método para obtener todas las tareas de un usuario
exports.getByUser = function (userId, callback) {
  myconnection(function (pool) {
    var query = 'SELECT tasks.id, taskName, tasks.description, project, priority, estimatedTime, requiredTime, userAssigned, state, users.firstName, users.lastName, projects.projectName FROM tasks LEFT JOIN users ON tasks.userAssigned = users.id LEFT JOIN projects ON tasks.project = projects.id WHERE userAssigned = ' + userId + ' GROUP BY tasks.id';
    pool.query(query, function (err, tasks) {
      if (err) {
        callback(false);
        return;
      } else if (tasks.length > 0) { // respuesta con los datos
        for (var i = 0; i < tasks.length; ++i) {
          tasks[i].fullName = tasks[i].firstName + ' ' + tasks[i].lastName;
          tasks[i] = assignStateName(tasks[i]);
        }
        callback(tasks);
      } else {
        callback('This user doesn\'t have any tasks.');
      };
    });
  });
};

// método para crear una nueva tarea
exports.add = function (task, callback) {
  myconnection(function (pool) {
    var query = 'INSERT INTO tasks (taskName, description, project, priority, estimatedTime, requiredTime, userAssigned, state) VALUES (' + pool.escape(task.taskName) + ', ' + pool.escape(task.description) + ', ' + task.project + ', ' + task.priority + ', ' + task.estimatedTime + ', ' + task.requiredTime +', ' + task.userAssigned +', ' + task.state +')';
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
    var query = 'UPDATE tasks SET taskName = ' + pool.escape(task.taskName) + ', description = ' + pool.escape(task.description) + ', project = ' + pool.escape(task.project) + ', priority = ' + pool.escape(task.priority) + ', estimatedTime = ' + pool.escape(task.estimatedTime) + ', requiredTime = ' + pool.escape(task.requiredTime) + ', userAssigned = ' + pool.escape(task.userAssigned) + ', state = ' + pool.escape(task.state) + ' WHERE id = ' + id;

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