var mongoose = require('mongoose');
var series   = require('run-series');

mongoose.connect('mongodb://localhost/taskmanager');

var SeedUsers    = require('./seeds/SeedUsers');
var SeedClients  = require('./seeds/SeedClients');
var SeedProjects = require('./seeds/SeedProjects');

series([
  function (callback) {
    SeedClients(5);
    callback(null);
  },
  function (callback) {
    SeedUsers(10);
    callback(null);
  },
  function (callback) {
    setTimeout(function () {
      SeedProjects();
      callback(null);
    }, 500);
  }
], function (err, res) {
  if (err) {
    console.log(err);
  } else {
    console.log('Seed ready');
  }
});
