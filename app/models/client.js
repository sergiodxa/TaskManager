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
        var client = response[0];
        callback(client);
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
exports.add = function (client, callback) {
  myconnection(function (pool) {
    var query = 'INSERT INTO clients (clientName, email, address, telephone) VALUES (' + pool.escape(client.clientName) + ', ' + pool.escape(client.email) + ', ' + pool.escape(client.address) + ', ' + pool.escape(client.telephone) + ')';
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
exports.edit = function (id, client, callback) {
  myconnection(function (pool) {
    var query = 'UPDATE clients SET clientName = ' + pool.escape(client.clientName) + ', email = ' + pool.escape(client.email) + ', telephone = ' + pool.escape(client.telephone) + ' WHERE id = ' + id;

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
