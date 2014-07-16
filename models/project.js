var myconnection = require('../modules/myconnection');
var client       = require('./client');
var users        = require('./user');

// método para obtener todos los datos de un user
exports.getSingle = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT projects.id, projectName, description, releaseDate, clientName, userName FROM projects LEFT JOIN clients ON projects.owner = clients.id LEFT JOIN users ON projects.projectLeader = users.id WHERE projects.id = ' + id + ' GROUP BY projects.id';
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
    var query = 'SELECT projects.id, projectName, description, releaseDate, owner, , clientName, userName FROM projects LEFT JOIN clients ON projects.owner = clients.id LEFT JOIN users ON projects.projectLeader = users.id GROUP BY projects.id';
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
    var query = 'SELECT * FROM projects WHERE owner = ' + pool.escape(id);
    pool.query(query, function (err, projects) {
      if (err) {
        callback(false);
        return;
      }
      client.getSingle(id, function (clientData) {
        for (var i = 0; i < projects.length; ++i) {
          projects.ownerName = client.name;
        }
        callback(projects);
      });
    });
  });
};

// método para crear un nuevo user
exports.add = function (project, callback) {
  myconnection(function (pool) {
    var query = 'INSERT INTO projects (projectName, owner, scrumMaster, description, releaseDate) VALUES (' + pool.escape(project.name) + ', ' + pool.escape(project.owner) + ', ' + pool.escape(project.scrumMaster) + ', ' + pool.escape(project.description) + ', ' + pool.escape(project.releaseDate) + ')';
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
    var query = 'UPDATE projects SET projectName = ' + pool.escape(project.name) + ', owner = ' + pool.escape(project.owner) + ', scrumMaster = ' + pool.escape(project.scrumMaster) + ', description = ' + pool.escape(project.description) + ' WHERE id = ' + id;

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