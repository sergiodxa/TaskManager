// Dependencies
var express      = require('express');

// Models

// Controllers
var miembros = require('./controllers/miembros');

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

app.get('/api/miembros/get/all', miembros.getAll);
app.get('/api/miembros/get/single/:id', miembros.getSingle)
app.post('/api/miembros/add/:id', miembros.add)
app.post('/api/miembros/edit/:id', miembros.edit)
app.post('/api/miembros/delete/:id', miembros.erase)

/*app.get('/test', function(req, res) {
  ModelMiembros.erase(5, function (response) {
    res.send(response);
  });
});*/

console.log('ScrumManager iniciado - App corriendo en el puerto ' + puerto);
