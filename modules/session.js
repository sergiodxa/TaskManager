/*
  Author: @sergiodxa
  Name: Session.js
  Version: 1.0.0
*/

var myconnection = require('./myconnection.js');
var encryptor    = require('./encryptor');

exports.login = function (user, pass, callback) {
  myconnection(function (pool) {
    if (pool === false) {
      callback(false);
    } else {
      var query = 'SELECT id, userName, pass FROM users WHERE userName = ' + pool.escape(user) + ' AND pass = ' + pool.escape(pass);
      pool.query(query, function (err, response) {
        if (err) {
          callback(false);
        } else if (response.length === 1) {
          var id    = response[0].id;
          var rand  = Math.floor((Math.random() * 29992) + 1);
          var token = user + '|' + rand;
          var token = encryptor(token);

          var queryToken = 'UPDATE users SET token = ' + pool.escape(token) + ' WHERE id = ' + pool.escape(id);
          pool.query(queryToken, function (err, response) {
            if (err) {
              callback(false);
            } else {
              var data = {
                "id"   : id,
                "user" : user,
                "token": token
              };
              callback(data);
            };
          });
        } else {
          callback(false);
        };
      });
    };
  });
};

exports.auth = function (id, user, token, callback) {
  myconnection(function (pool) {
    if (pool === false) {
      callback(false);
    } else {
      var query = 'SELECT id, userName, token FROM users WHERE id = ' + pool.escape(id) + ' AND userName = ' + pool.escape(user) + ' AND token = ' + pool.escape(token);

      pool.query(query, function (err, response) {
        if (err) {
          callback(false);
        } else if (response.length === 1) {
          callback(true);
        } else {
          callback(false);
        }
      });
    };
  });
};

exports.logout = function (id, user, token, callback) {
  myconnection(function (pool) {
    if (pool === false) {
      callback(false);
    } else {
      var query = 'UPDATE users SET token = NULL WHERE id = ' + pool.escape(id) + ' AND userName = ' + pool.escape(user) + ' AND token = ' + pool.escape(token);

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
