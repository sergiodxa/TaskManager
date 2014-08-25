var cluster  = require('cluster');

if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require('os').cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for dying workers
  cluster.on('exit', function (worker) {
    // Replace the dead worker, we're not sentimental
    console.log('Worker ' + worker.id + ' died :(');

    cluster.fork();
  });

  // As workers come up.
  cluster.on('listening', function(worker, address) {
    console.log("A worker with #"+worker.id+" is now connected to " + address.address + ":" + address.port);
  });

  // Count requestes
  function messageHandler(msg) {
    if (msg.cmd && msg.cmd == 'notifyRequest') {
      numReqs += 1;
    }
  }

  Object.keys(cluster.workers).forEach(function(id) {
    cluster.workers[id].on('message', messageHandler);
  });
} else {
  // Dependencies
  var express  = require('express');
  var http     = require('http');
  var io       = require('socket.io');
  var mongoose = require('mongoose');

  // Start app
  var app = express();
  server  = http.createServer(app)

  // App Config
  app.use(express.static(__dirname + '/public'));

  var port = Number(process.env.PORT || 3000);

  server.listen(port, function () {
    console.log('Running on ' + port);
  });

  // Mongoose connect
  mongoose.connect('mongodb://localhost/taskmanager');

  // Controllers
  var CtrlClient  = require('./app/controllers/CtrlClient');
  var CtrlProject = require('./app/controllers/CtrlProject');
  var CtrlTask    = require('./app/controllers/CtrlTask');
  var CtrlUser    = require('./app/controllers/CtrlUser');
  var CtrlSession = require('./app/controllers/CtrlSession');

  // App Routes
  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/public/app.html');
  });

  // Session routes
  app.get('/session/login', CtrlSession.login);
  app.post('/session/auth', CtrlSession.auth);
  app.post('/session/logout', CtrlSession.logout);

  // Socket.io initialized
  io = io.listen(server);

  // Socket.io events
  io.on('connection', function (socket) {
    CtrlClient.io(socket);
    CtrlProject.io(socket);
    CtrlTask.io(socket);
    CtrlUser.io(socket);
  });

  console.log('TaskManger started - App running in the port ' + port);
}
