var model = require('../models/client');

exports.getAll = function (req, res) {
  model.getAll(function (clients) {
    res.send(clients);
  });
};

exports.getSingle = function (req, res) {
  var id = req.params.id;

  model.getSingle(id, function (client) {
    res.send(client);
  });
};

exports.add = function (req, res) {
  var user = JSON.parse(req.query.user);

  model.add(user, function (response) {
    if (response === 'Client added') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    }
  });
};

exports.edit = function (req, res) {
  var id = req.params.id;
  var user = JSON.parse(req.query.user);

  model.edit(id, user, function (response) {
    if (response === 'Client edited') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    };
  });
};

exports.erase = function (req, res) {
  var id = req.params.id;

  model.erase(id, function (response) {
    if (response === 'Client deleted') {
      res.send(response);
    } else if (response === false) {
      res.send('Error');
    }
  })
};

exports.io = function (socket) {
  socket.on('get clients', function () {
    model.getAll(function (clientsData) {
      socket.emit('return clients', clientsData);
    });
  });

  socket.on('get client', function (id) {
    model.getSingle(id, function (clientData) {
      socket.emit('return client', clientData);
    });
  });

  socket.on('edit client', function (data) {
    model.edit(data.id, data.data, function (response) {
      if (response === 'Client edited') {
        socket.emit('client edited', 'Client edited');
        model.getAll(function (clientsData) {
          socket.broadcast.emit('return clients', clientsData);
        });
      } else {
        socket.emit('edit client failed', 'An error has ocurred');
      }
    });
  });

  socket.on('delete client', function (id) {
    model.erase(id, function (response) {
      if (response === 'Client deleted') {
        socket.emit('client deleted', 'Client deleted');
        model.getAll(function (clientsData) {
          socket.broadcast.emit('return clients', clientsData);
        });
      } else if (response === false) {
        socket.emit('delete client failed', 'Error');
      }
    });
  });

  socket.on('add client', function (data) {
    model.add(data, function (response) {
      if (response === 'Client added') {
        socket.emit('client added', 'Client added');
        model.getAll(function (clientsData) {
          socket.broadcast.emit('return clients', clientsData);
        });
      } else if (response === false) {
        socket.emit('add client failed', 'An error has ocurred');
      }
    });
  });
};
