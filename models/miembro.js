var myconnection = require('../modules/myconnection');

// método para obtener todos los datos de un miembro
exports.getSingle = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM miembros WHERE id = ' + id;
    pool.query(query, function (err, response) {
      if (err) {
        console.error(err);
      }

      if (response.length === 1) {
        var miembro = response[0];
        miembro.nombreCompleto = miembro.nombre + ' ' + miembro.apellido;
        callback(miembro);
      } else {
        callback('Ese usuario no existe');
      }
    });
  });
};

// método para obtener los datos de todos los miembros
exports.getAll = function (callback) {
  myconnection(function (pool) {
    var query = 'SELECT id, usuario, nombre, apellido, email, cargo FROM miembros';
    pool.query(query, function (err, response) {
      if (err) {
        console.error(err);
      }
      callback(response);
    });
  });
};

// método para crear un nuevo miembro
exports.add = function (miembro, callback) {
  myconnection(function (pool) {
    var query = 'INSERT INTO miembros (usuario, pass, nombre, apellido, email, cargo) VALUES (' + pool.escape(miembro.usuario) + ', ' + pool.escape(miembro.pass) + ', ' + pool.escape(miembro.nombre) + ', ' + pool.escape(miembro.apellido) + ', ' + pool.escape(miembro.email) + ', ' + pool.escape(miembro.cargo) +')';
    pool.query(query, function (err, response) {
      if (err) {
        console.error(err);
      }
      callback(response);
    });
  });
};

// método para modificar un miembro
exports.edit = function (id, miembro, callback) {
  myconnection(function (pool) {
    if (miembro.pass) {
      if (miembro.pass === miembro.repeatPass) {
        var query = 'UPDATE miembros SET usuario = ' + pool.escape(miembro.usuario) + ', pass = ' + pool.escape(miembro.pass) + ', nombre = ' + pool.escape(miembro.nombre) + ', apellido = ' + pool.escape(miembro.apellido) + ', email = ' + pool.escape(miembro.email) + ', cargo = ' + pool.escape(miembro.cargo) + 'WHERE id = ' + id;

        pool.query(query, function (err, response) {
          if (err) {
            console.error(err);
          }
          callback(response);
        });
      } else {
        callback('Contraseña mal escrita');
      };
    } else {
      var query = 'UPDATE miembros SET usuario = ' + pool.escape(miembro.usuario) + ', nombre = ' + pool.escape(miembro.nombre) + ', apellido = ' + pool.escape(miembro.apellido) + ', email = ' + pool.escape(miembro.email) + ', cargo = ' + pool.escape(miembro.cargo) + 'WHERE id = ' + id;

      pool.query(query, function (err, response) {
        if (err) {
          console.error(err);
        }
        callback(response);
      });
    };
  });
};

// método para eliminar un miembro
exports.erase = function (id, callback) {
  myconnection(function (pool) {
    var query = 'DELETE FROM miembros WHERE id = ' + id;

    pool.query(query, function (err, response) {
      if (err) {
        console.error(err);
      }
      callback(response);
    });
  });
};
