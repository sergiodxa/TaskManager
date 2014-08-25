var Client   = require('../models/ModelClient');
var mongoose = require('mongoose');

exports.io = function (socket) {

  // event for get all clients
  socket.on('get clients', function () {
    Client.find(function (err, res) {
      if (err) {
        console.error(err);
      } else {
        socket.emit('return clients', res);
      }
    });
  });

  // event for get a single client
  socket.on('get client', function (id) {
    Client.findById(mongoose.Types.ObjectId(id), function (err, res) {
      if (err) {
        console.error(err);
      } else {
        socket.emit('return client', res);
      };
    });
  });

  // event for add a new client
  socket.on('add client', function (data) {
    var instance = new Client({
      clientName: data.clientName,
      email     : data.email,
      address   : data.address,
      telephone : data.telephone
    });

    instance.save(function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('add client failed', 'An error has ocurred');
      } else {
        socket.emit('client added', 'Client added');
        Client.find(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            socket.broadcast.emit('return clients', res);
          }
        });
      };
    });
  });

  // event for edit a client
  socket.on('edit client', function (data) {
    Client.findByIdAndUpdate(mongoose.Types.ObjectId(data.id), data.data, function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('edit client failed', 'An error has ocurred');
      } else {
        socket.emit('client edited', 'Client edited');
        Client.find(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            socket.broadcast.emit('return clients', res);
          }
        });
      };
    });
  });

  // event for erase a client
  socket.on('delete client', function (id) {
    Client.findByIdAndRemove(mongoose.Types.ObjectId(id), function (err, res) {
      if (err) {
        console.error(err);
        socket.emit('delete client failed', 'Error');
      } else {
        socket.emit('client deleted', 'Client deleted');
        Client.find(function (err, res) {
          if (err) {
            console.error(err);
          } else {
            socket.broadcast.emit('return clients', res);
          }
        });
      };
    });
  });

};