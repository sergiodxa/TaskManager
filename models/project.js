var myconnection = require('../modules/myconnection');

// método para obtener todos los datos de un user
exports.getSingle = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT projects.id, projectName, description, releaseDate, owner, projectLeader, clientName, userName FROM projects LEFT JOIN clients ON projects.owner = clients.id LEFT JOIN users ON projects.projectLeader = users.id WHERE projects.id = ' + id + ' GROUP BY projects.id';
    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }

      if (response.length === 1) {
        callback(response[0]);
      } else {
        callback('That project doesn\'t exist');
      }
    });
  });
};

// método para obtener los datos de todos los users
exports.getAll = function (callback) {
  myconnection(function (pool) {
    var query = 'SELECT projects.id, projectName, description, releaseDate, owner, projectLeader, clientName, userName FROM projects LEFT JOIN clients ON projects.owner = clients.id LEFT JOIN users ON projects.projectLeader = users.id GROUP BY projects.id';
    pool.query(query, function (err, projects) {
      if (err) {
        callback(false);
        return;
      }
      if (projects.length !== 0) {
        callback(projects);
      } else {
        callback(false);
      }
    });
  });
};

// método para obtener todos los proyectos de un client
exports.getByClient = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT projects.id, projectName, description, releaseDate, owner, projectLeader, clientName, userName FROM projects LEFT JOIN clients ON projects.owner = clients.id LEFT JOIN users ON projects.projectLeader = users.id WHERE owner = ' + pool.escape(id);
    pool.query(query, function (err, projects) {
      if (err) {
        callback(false);
        return;
      }
      callback(projects);
    });
  });
};

// método para crear un nuevo user
exports.add = function (project, callback) {
  myconnection(function (pool) {
    var query = 'INSERT INTO projects (projectName, owner, projectLeader, description, releaseDate) VALUES (' + pool.escape(project.projectName) + ', ' + pool.escape(project.owner) + ', ' + pool.escape(project.projectLeader) + ', ' + pool.escape(project.description) + ', ' + pool.escape(project.releaseDate) + ')';
    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }
      callback('Project created');
    });
  });
};

// método para modificar un user
exports.edit = function (id, project, callback) {
  myconnection(function (pool) {
    var query = 'UPDATE projects SET projectName = ' + pool.escape(project.projectName) + ', owner = ' + pool.escape(project.owner) + ', projectLeader = ' + pool.escape(project.projectLeader) + ', description = ' + pool.escape(project.description) + ' WHERE id = ' + id;

    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }
      callback('Project edited');
    });
  });
};

// método para eliminar un user
exports.erase = function (id, callback) {
  myconnection(function (pool) {
    var query = 'DELETE FROM projects WHERE id = ' + id;

    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
          return;
      }
      callback('Project deleted');
    });
  });
};