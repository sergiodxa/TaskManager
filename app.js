// Dependencies
var express = require('express');

// Controllers
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

  // Users routes
app.get('/api/users/get/all', user.getAll);
app.get('/api/users/get/single/:id', user.getSingle);
app.get('/api/users/only/scrummasters', user.getOnlyScrumMasters);
app.post('/api/users/add', user.add);
app.post('/api/users/edit/:id', user.edit);
app.post('/api/users/delete/:id', user.erase);

  // Tasks routes
app.get('/api/tasks/get/all', task.getAll);
app.get('/api/tasks/get/single/:id', task.getSingle);
app.get('/api/tasks/get/by/user/:id', task.getByUser);
app.get('/api/tasks/get/by/project/:id', task.getByProject);
app.post('/api/tasks/add', task.add);
app.post('/api/tasks/edit/:id', task.edit);
app.post('/api/tasks/delete/:id', task.erase);

  // Project routes
app.get('/api/projects/get/all', project.getAll);
app.get('/api/projects/get/single/:id', project.getSingle);
app.post('/api/projects/add', project.add);
app.post('/api/projects/edit/:id', project.edit);
app.post('/api/projects/delete/:id', project.erase);

/*app.get('/test', function(req, res) {
  Modelusers.erase(5, function (response) {
    res.send(response);
  });
});*/

console.log('TaskManger started - App running in the port ' + puerto);
