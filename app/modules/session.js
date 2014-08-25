/*
  Author: @sergiodxa
  Name: Session.js
  Version: 2.0.0
*/
var User          = require('../models/ModelUser.js');
var RedisSessions = require("redis-sessions");
var rs            = new RedisSessions({
  port: 6379,
  host: '127.0.0.1'
});
var appName       = 'TaskManager';

exports.login = function (user, pass, ip, callback) {
  User.findOne({ userName: user, pass: pass }, function (err, res) {
    if (err) {
      callback(false);
    } else {
      rs.create({
        app: appName,
        id: res._id,
        ip: ip,
      }, function(err, resp) {
        if (err) {
          callback(false);
        } else {
          callback({
            'id': res._id,
            'user': user,
            'token': resp.token
          });
        }
      });
    };
  });
};

exports.auth = function (token, callback) {
  rs.get({
    app: appName,
    token: token
  }, function (err, resp) {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.logout = function (token, callback) {
  rs.kill({
    app: appName,
    token: token
  }, function (err, resp) {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};
