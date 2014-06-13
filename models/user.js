var myconnection = require('../modules/myconnection');

// método para obtener todos los datos de un user
exports.getSingle = function (id, callback) {
  myconnection(function (pool) {
    var query = 'SELECT * FROM users WHERE id = ' + id;
    pool.query(query, function (err, response) {
      if (err) {
        console.error(err);
      }

      if (response.length === 1) {
        var user = response[0];
        user.fullName = user.firstName + ' ' + user.lastName;
        callback(user);
      } else {
        callback('That user doesn\'t exist');
      }
    });
  });
};

// método para obtener los datos de todos los users
exports.getAll = function (callback) {
  myconnection(function (pool) {
    var query = 'SELECT id, userName, firstName, lastName, email, position FROM users';
    pool.query(query, function (err, response) {
      if (err) {
        console.error(err);
      }
      for (var i = 0; i < response.length; ++i) {
        response[i].fullName = response[i].firstName + ' ' + response[i].lastName;
      }
      callback(response);
    });
  });
};

// método para crear un nuevo user
exports.add = function (user, callback) {
  myconnection(function (pool) {
    var query = 'INSERT INTO users (userName, pass, firstName, lastName, email, position) VALUES (' + pool.escape(user.userName) + ', ' + pool.escape(user.newPass) + ', ' + pool.escape(user.firstName) + ', ' + pool.escape(user.lastName) + ', ' + pool.escape(user.email) + ', ' + pool.escape(user.position) +')';
    pool.query(query, function (err, response) {
      if (err) {
        callback(false);
      }
      callback('User created');
    });
  });
};

// método para modificar un user
exports.edit = function (id, user, callback) {
  myconnection(function (pool) {
    if (user.newPass) {
      if (user.newPass === user.repeatPass) {
        var query = 'UPDATE users SET userName = ' + pool.escape(user.userName) + ', pass = ' + pool.escape(user.newPass) + ', firstName = ' + pool.escape(user.firstName) + ', lastName = ' + pool.escape(user.lastName) + ', email = ' + pool.escape(user.email) + ', position = ' + pool.escape(user.position) + 'WHERE id = ' + id;

        pool.query(query, function (err, response) {
          if (err) {
            callback(false);
          }
          callback('User data with pass edited');
        });
      } else {
        callback('Password wrong');
      };
    } else {
      var query = 'UPDATE users SET userName = ' + pool.escape(user.userName) + ', firstName = ' + pool.escape(user.firstName) + ', lastName = ' + pool.escape(user.lastName) + ', email = ' + pool.escape(user.email) + ', position = ' + pool.escape(user.position) + 'WHERE id = ' + id;

      pool.query(query, function (err, response) {
        if (err) {
          callback(false);
        }
        callback('User data without pass edited');
      });
    };
  });
};

// método para eliminar un user
exports.erase = function (id, callback) {
  myconnection(function (pool) {
    var query = 'DELETE FROM users WHERE id = ' + id;

    pool.query(query, function (err, response) {
      if (err) {
        callback(false)
      }
      callback('User deleted');
    });
  });
};
