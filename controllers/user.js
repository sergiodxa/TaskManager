var model = require('../models/user');

exports.getAll = function (req, res) {
  model.getAll(function (users) {
    res.send(users);
  });
};

exports.getSingle = function (req, res) {
  var id = req.params.id;

  model.getSingle(id, function (user) {
    res.send(user);
  });
};

exports.getOnlyScrumMasters = function (req, res) {
  model.getOnlyScrumMasters(function (users) {
    res.send(users);
  });
};

exports.add = function (req, res) {
  var user = JSON.parse(req.query.user);

  model.add(user, function (response) {
    if (response === 'User created') {
      res.send('User added');
    } else if (response === false) {
      res.send('An error has ocurred');
    }
  });
};

exports.edit = function (req, res) {
  var id = req.params.id;
  var user = JSON.parse(req.query.user);

  model.edit(id, user, function (response) {
    if (response === 'User data with pass edited' || response === 'Password wrong' || response === 'User data without pass edited') {
      res.send(response);
    } else if (response === false) {
      res.send('An error has ocurred');
    };
  });
};

exports.erase = function (req, res) {
  var id = req.params.id;

  model.erase(id, function (response) {
    if (response === 'User deleted') {
      res.send('User deleted');
    } else if (response === false) {
      res.send('Error');
    }
  })
};

exports.io = function (socket) {
  socket.on('get users', function () {
    model.getAll(function (usersData) {
      socket.emit('return users', usersData);
    });
  });

  socket.on('get user', function (id) {
    model.getSingle(id, function (userData) {
      socket.emit('return user', userData);
    });
  });

  socket.on('add user', function (data) {
    model.add(data, function (response) {
      if (response === 'User created') {
        socket.emit('user added', 'User created');
        model.getAll(function (usersData) {
          socket.broadcast.emit('return users', usersData);
        });
      } else if (response === false) {
        socket.emit('add user failed', 'An error has ocurred');
      }
    });
  });

  socket.on('edit user', function (data) {
    model.edit(data.id, data.data, function (response) {
      if (response === 'User data with pass edited') {
        socket.emit('user with pass edited', 'User data with pass edited');
        model.getAll(function (usersData) {
          socket.broadcast.emit('return users', usersData);
        });
        model.getSingle(data.id, function (userData) {
          socket.emit('return user', userData);
        });
      } else if (response === 'User data without pass edited') {
        socket.emit('user without pass edited ', 'User data without pass edited');
        model.getAll(function (usersData) {
          socket.broadcast.emit('return users', usersData);
        });
        model.getSingle(data.id, function (userData) {
          socket.emit('return user', userData);
        });
      } else if (response === false) {
        socket.emit('edit user failed', 'An error has ocurred');
      };
    });
  });

  socket.on('delete user', function (id) {
    model.erase(id, function (response) {
      if (response === 'User deleted') {
        socket.emit('user deleted', 'User deleted');
        model.getAll(function (usersData) {
          socket.broadcast.emit('return users', usersData);
        });
      } else if (response === false) {
        socket.emit('delete user failed', 'Error');
      }
    });
  });
};
