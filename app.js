// Dependencies
var express      = require('express');

// Models

// Controllers
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

app.get('/api/users/get/all', user.getAll);
app.get('/api/users/get/single/:id', user.getSingle)
app.post('/api/users/add/:id', user.add)
app.post('/api/users/edit/:id', user.edit)
app.post('/api/users/delete/:id', user.erase)

/*app.get('/test', function(req, res) {
  Modelusers.erase(5, function (response) {
    res.send(response);
  });
});*/

console.log('TaskManger started - App running in the port ' + puerto);
