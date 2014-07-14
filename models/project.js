var myconnection = require('../modules/myconnection');
var client       = require('./client');
var users        = require('./user');

// método para obtener todos los datos de un user
exports.getSingle = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM projects WHERE id = ' + id;
    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }

      if (response.length === 1) {
        var project       = response[0];
        var clientId      = project.owner;
        var scrumMasterId = project.scrumMaster;
        client.getSingle(clientId, function (client) {
          project.ownerName = client.name;
          users.getSingle(scrumMasterId, function (user) {
            project.scrumMasterName = user.fullName;
            callback(project);
          });
        });
      } else {
        callback('That project doesn\'t exist');
      }
    });
  });
};

// método para obtener los datos de todos los users
exports.getAll = function (callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM projects';
    pool.query(query, function (err, projects) {
      if (err) {
        callback(false);
        return;
      }
      if (projects.length !== 0) {
        // obtenemos los datos de todos los clientes para saber sus nombres
        client.getAll(function (clientsData) {
          for (var i1 = 0; i1 < projects.length; ++i1) {
            var clientId = parseInt(projects[i1].owner);
            var client;
            for (var i2 = 0; i2 < clientsData.length; ++i2) {
              if (clientsData[i2].id === clientId) {
                client = i2;
              };
            };
            projects[i1].ownerName = clientsData[client].name;
          };
          users.getAll(function (usersData) {
            for (var i1 = 0; i1 < projects.length; ++i1) {
              var scrumMasterId = projects[i1].scrumMaster;
              var scrumMaster;
              for (var i2 = 0; i2 < usersData.length; ++i2) {
                if (usersData[i2].id === scrumMasterId) {
                  scrumMaster = i2;
                };
              };
              projects[i1].scrumMasterName = usersData[scrumMaster].fullName;
            }
            callback(projects);
          });
        });
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
    var query = 'INSERT INTO projects (name, owner, scrumMaster, description, releaseDate) VALUES (' + pool.escape(project.name) + ', ' + pool.escape(project.owner) + ', ' + pool.escape(project.scrumMaster) + ', ' + pool.escape(project.description) + ', ' + pool.escape(project.releaseDate) + ')';
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
    var query = 'UPDATE projects SET name = ' + pool.escape(project.name) + ', owner = ' + pool.escape(project.owner) + ', scrumMaster = ' + pool.escape(project.scrumMaster) + ', description = ' + pool.escape(project.description) + ' WHERE id = ' + id;

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