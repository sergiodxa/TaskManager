// Dependencies
var express  = require('express');
var http     = require('http');
var connect  = require('connect');
var cookie   = require('cookie');
var session  = require('express-session');
var io       = require('socket.io');
var mongoose = require('mongoose');

// Start app
var app = express();
server  = http.createServer(app)

// App Config
app.use(connect.cookieParser());
app.use(session({secret: 'secret', key: 'express.sid'}));
app.use(express.static(__dirname + '/app'));

var port = Number(process.env.PORT || 3000);

server.listen(port, function () {
  console.log('Running on ' + port);
});

// Mongoose connect
mongoose.connect('mongodb://localhost/taskmanager');

// Socket.io initialized
io = io.listen(server);

// Controllers
var session     = require('./controllers/session');

var CtrlClient  = require('./controllers/CtrlClient');
var CtrlProject = require('./controllers/CtrlProject');
var CtrlTask    = require('./controllers/CtrlTask');
var CtrlUser    = require('./controllers/CtrlUser');

// App Routes
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/app/app.html');
});

// API Routes
  // Session routes
app.get('/api/session/login', session.login);
app.post('/api/session/auth', session.auth);
app.post('/api/session/logout', session.logout);

// Connected users
var connectedUsers = {}

// Socket.io events
io.set('authorization', function (handshakeData, accept) {
  if (handshakeData.headers.cookie) {
    handshakeData.cookie = cookie.parse(handshakeData.headers.cookie);

    handshakeData.sessionID = connect.utils.parseSignedCookie(handshakeData.cookie['express.sid'], 'secret');

    if (handshakeData.cookie['express.sid'] == handshakeData.sessionID) {
      console.error('Cookie is invalid');
      return accept('Cookie is invalid.', false);
    }
  } else {
    console.error('No cookie transmitted');
    return accept('No cookie transmitted.', false);
  }

  accept(null, true);
});

io.on('connection', function (socket) {
  connectedUsers[socket.id] = Math.random();

  CtrlClient.io(socket, connectedUsers);
  CtrlProject.io(socket, connectedUsers);
  CtrlTask.io(socket, connectedUsers);
  CtrlUser.io(socket, connectedUsers);

  socket.on('disconnect', function () {
    delete connectedUsers[socket.id];
  });
});

console.log('TaskManger started - App running in the port ' + port);
