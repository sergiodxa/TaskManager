var mongoose = require('mongoose');
var User      = require('../models/ModelUser');

exports.io = function (socket) {

  // event for get all users
  socket.on('get users', function () {
    User.find(function (err, res) {
      if (err) {
        console.error(err);
      } else {
        socket.emit('return users', res);
      }
    });
  });

  // event for get a single user
  socket.on('get user', function (id) {
    User.findById(mongoose.Types.ObjectId(id), function (err, res) {
      if (err) {
        console.error(err);
      } else {
        socket.emit('return user', res);
      };
    });
  });

  // event for add a new user
  socket.on('add user', function (data) {
    var instance = new User({
      userName : data.userName,
      pass     : data.newPass,
      firstName: data.firstName,
      lastName : data.lastName,
      email    : data.email,
      position : data.position
    });

    instance.save(function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('add user failed', 'An error has ocurred');
      } else {
        socket.emit('user added', 'User added');
        User.find(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            socket.broadcast.emit('return users', res);
          }
        });
      };
    });
  });

  // event for edit a user
  socket.on('edit user', function (data) {
    User.findByIdAndUpdate(mongoose.Types.ObjectId(data.id), data.data, function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('edit user failed', 'An error has ocurred');
      } else {
        socket.emit('user edited', 'User edited');
        User.find(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            socket.broadcast.emit('return users', res);
          }
        });
      };
    });
  });

  // event for erase a user
  socket.on('delete user', function (id) {
    User.findByIdAndRemove(mongoose.Types.ObjectId(id), function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('delete user failed', 'Error');
      } else {
        socket.emit('user deleted', 'User deleted');
        User.find(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            socket.broadcast.emit('return users', res);
          }
        });
      };
    });
  });

};
