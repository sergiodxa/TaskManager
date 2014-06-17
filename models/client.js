var myconnection = require('../modules/myconnection');

// método para obtener todos los datos de un cliente
exports.getSingle = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM clients WHERE id = ' + id;
    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }

      if (response.length === 1) {
        var project = response[0];
        callback(project);
      } else {
        callback('That client doesn\'t exist');
      }
    });
  });
};

// método para obtener los datos de todos los clients
exports.getAll = function (callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM clients';
    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }
      callback(response);
    });
  });
};

// método para crear un nuevo cliente
exports.add = function (project, callback) {
  myconnection(function (pool) {
    var query = 'INSERT INTO clients (name, email, telephone) VALUES (' + pool.escape(project.name) + ', ' + pool.escape(project.email) + ', ' + pool.escape(project.telephone) + ')';
    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }
      callback('Client added');
    });
  });
};

// método para modificar un cliente
exports.edit = function (id, project, callback) {
  myconnection(function (pool) {
    var query = 'UPDATE clients SET name = ' + pool.escape(project.name) + ', email = ' + pool.escape(project.email) + ', telephone = ' + pool.escape(project.telephone) + ' WHERE id = ' + id;

    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
        return;
      }
      callback('Client edited');
    });
  });
};

// método para eliminar un cliente
exports.erase = function (id, callback) {
  myconnection(function (pool) {
    var query = 'DELETE FROM clients WHERE id = ' + id;

    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
          return;
      }
      callback('Client deleted');
    });
  });
};
