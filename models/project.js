var myconnection = require('../modules/myconnection');
var client       = require('./client');

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
        var project = response[0];
        var clientId = project.owner;
        client.getSingle(clientId, function (client) {
          project.ownerName = client.name;
        })
        callback(project);
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
      // obtenemos los datos de todos los clients para saber sus nombres
      client.getAll(function (clientsData) {
        for (var i = 0; i < projects.length; ++i) {
          var clientId = projects[i].userAsigned-1;
          projects[i].ownerName = clientsData[clientId].name;
        }
        callback(projects)
      });
    });
  });
};

// método para obtener todos los proyectos de un client
exports.getByClient = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM projects WHERE client = ' + pool.escape(id);
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
