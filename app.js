// Dependencies
var express = require('express');

// Controllers
var client  = require('./controllers/client');
var project = require('./controllers/project');
var session = require('./controllers/session');
var task    = require('./controllers/task');
var user    = require('./controllers/user');

// Start app
var app = express();
var server = require('http').Server(app);

// App Config
app.use(express.static(__dirname + '/app'));
var port = Number(process.env.PORT || 3000);
var serverListen = app.listen(port, function() {
  console.log('Running on ' + port);
});

// Socket.io initialized
var io = require('socket.io').listen(serverListen);

// App Routes
app.get('/', function (req, res) {  
  res.sendfile(__dirname + '/app/app.html');
});

// API Routes
  // Client routes
app.get('/api/clients/get/all', client.getAll);
app.get('/api/clients/get/single/:id', client.getSingle);
app.post('/api/clients/add', client.add);
app.post('/api/clients/edit/:id', client.edit);
app.post('/api/clients/delete/:id', client.erase);

  // Project routes
app.get('/api/projects/get/all', project.getAll);
app.get('/api/projects/get/single/:id', project.getSingle);
app.get('/api/projects/by/client/:id', project.getByClient);
app.post('/api/projects/add', project.add);
app.post('/api/projects/edit/:id', project.edit);
app.post('/api/projects/delete/:id', project.erase);

  // Session routes
app.get('/api/session/login', session.login);
app.post('/api/session/auth', session.auth);
app.post('/api/session/logout', session.logout);

  // Tasks routes
app.get('/api/tasks/get/all', task.getAll);
app.get('/api/tasks/get/single/:id', task.getSingle);
app.get('/api/tasks/get/by/user/:id', task.getByUser);
app.get('/api/tasks/get/by/project/:id', task.getByProject);
app.post('/api/tasks/add', task.add);
app.post('/api/tasks/edit/:id', task.edit);
app.post('/api/tasks/delete/:id', task.erase);

  // Users routes
app.get('/api/users/get/all', user.getAll);
app.get('/api/users/get/single/:id', user.getSingle);
app.get('/api/users/only/scrummasters', user.getOnlyScrumMasters);
app.post('/api/users/add', user.add);
app.post('/api/users/edit/:id', user.edit);
app.post('/api/users/delete/:id', user.erase);

// Socket.io events
io.on('connection', function (socket) {
  var clientModel  = require('./models/client');
  var projectModel = require('./models/project');
  var taskModel    = require('./models/task');
  var userModel    = require('./models/user');

  socket.on('get clients', function () {
    clientModel.getAll(function (clientsData) {
      socket.emit('return clients', clientsData);
    });
  });

  socket.on('get client', function (id) {
    clientModel.getSingle(id, function (clientData) {
      socket.emit('return client', clientData);
    });
  });

  socket.on('edit client', function (data) {
    clientModel.edit(data.id, data.data, function (response) {
      if (response === 'Client edited') {
        socket.emit('client edited', 'Client edited');
        clientModel.getAll(function (clientsData) {
          socket.broadcast.emit('return clients', clientsData);
        });
      } else {
        socket.emit('edit client failed', 'An error has ocurred');
      }
    });
  });

  socket.on('delete client', function (id) {
    clientModel.erase(id, function (response) {
      if (response === 'Client deleted') {
        socket.emit('client deleted', 'Client deleted');
        clientModel.getAll(function (clientsData) {
          socket.broadcast.emit('return clients', clientsData);
        });
      } else if (response === false) {
        socket.emit('delete client failed', 'Error');
      }
    });
  });

  socket.on('add client', function (data) {
    clientModel.add(data, function (response) {
      if (response === 'Client added') {
        socket.emit('client added', 'Client added');
        clientModel.getAll(function (clientsData) {
          socket.broadcast.emit('return clients', clientsData);
        });
      } else if (response === false) {
        socket.emit('add client failed', 'An error has ocurred');
      }
    });
  });
});

console.log('TaskManger started - App running in the port ' + port);
