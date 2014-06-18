// Dependencies
var express = require('express');

// Controllers
var client = require('./controllers/client');
var project = require('./controllers/project');
var task = require('./controllers/task');
var user = require('./controllers/user');

// Start app
var app = express();

// App Config
app.use(express.static(__dirname + '/front'));
var puerto = 3000;
app.listen(puerto);

// App Routes
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/front/app.html');
});

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

console.log('TaskManger started - App running in the port ' + puerto);
