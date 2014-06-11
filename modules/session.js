/*
  Author: @sergiodxa
  Name: Session.js
  Version: 1.0.0
*/

var myconnection = require('./myconnection.js');

exports.login = function (user, pass, callback) {
  myconnection(function (pool) {
    if (pool === false) {
      callback(false);
    } else {
      var query = 'SELECT user, pass FROM users WHERE user = ' + pool.escape(user) + ', pass = ' + pool.escape(pass);

      pool.query(query, function (err, response) {
        if (err) {
          callback(false);
        } else if (response.length === 1) {
          // COMENTADA PARA PRUEBAS
          //var rand = Math.floor((Math.random() * 19992) + 1);
          var rand = 19992;
          var token = user + '|' + rand;

          var queryToken = 'UPDATE users SET token = ' + token + ' WHERE user = ' + pool.escape(user) + ', pass = ' + pool.escape(pass);

          pool.query(queryToken, function (err, response) {
            if (err) {
              callback(false);
            } else {
              callback(token);
            };
          });
        };
      });
    };
  });
};

exports.auth = function (user, token, callback) {
  myconnection(function (pool) {
    if (pool === false) {
      callback(false);
    } else {
      var query = 'SELECT user, token FROM users WHERE user = ' + pool.escape(user) + ', token = ' + pool.escape(token);

      pool.query(query, function (err, response) {
        if (err) {
          callback(false);
        } else if (response.length === 1) {
          callback(true);
        };
      });
    };
  });
};

exports.logout = function (user, token, callback) {
  myconnection(function (pool) {
    if (pool === false) {
      callback(false);
    } else {
      var query = 'UPDATE users SET token = NULL WHERE user = ' + pool.escape(user) + ', token = ' + pool.escape(token);

      pool.query(query, function (err, response) {
        if (err) {
          callback(false);
        } else {
          callback(true);
        };
      });
    };
  });
};
