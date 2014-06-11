/*
  Author: @sergiodxa
  Name: MyConnection.js
  Version: 2.0.0
*/

var mysql = require('mysql'),
    pool  = mysql.createPool({
      connectionLimit: 10,
      host    : 'localhost',
      user    : 'scrum-user',
      password: 'WwsywaLFu9pfWBc4',
      database: 'scrum-manager'
    });

module.exports = function (connectionCallback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      connectionCallback(false);
    } else {
      // do something if connection was successful
      if (connectionCallback && typeof (connectionCallback) === 'function') {
        connectionCallback(pool);
      };

      // terminate the connection
      connection.release();
    };
  });
};
