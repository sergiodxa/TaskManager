var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskmanager');

var SeedUsers    = require('./seeds/SeedUsers');
var SeedClients  = require('./seeds/SeedClients');
var SeedProjects = require('./seeds/SeedProjects');

SeedUsers(10);
SeedClients(5);
SeedProjects();
