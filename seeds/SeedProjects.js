var mongoose  = require('mongoose');
var waterfall = require('run-waterfall');
var Client    = require('../app/models/ModelClient');
var Project   = require('../app/models/ModelProject');
var User      = require('../app/models/ModelUser');

var projectNames = ['WebApp', 'Corporative Website', 'Intranet', 'eCommerce', 'Blog', 'Mobile App'];

function generateProjects() {
  waterfall([
    function (callback) {
      Client.find(function (err, clients) {
        if (err) {
          callback(err);
        } else {
          callback(null, clients);
        };
      });
    }, function (clients, callback) {
      User.find({ position: 'Project Leader' }, function (err, users) {
        if (err) {
          callback(err);
        } else {
          callback(null, clients, users);
        };
      });
    }, function (clients, users, callback) {
      for (var i = 0; i < clients.length; i++) {
        var projectName = projectNames[Math.floor(Math.random() * projectNames.length)];
        var description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, magnam. Eius, qui dolorum repudiandae exercitationem expedita fuga sapiente suscipit. Commodi dolores asperiores nesciunt fugiat voluptates. Ex atque perferendis explicabo minima!';

        var releaseDateYear  = 2015;
        var releaseDateMonth = Math.floor((Math.random() * 12) + 1);
        var releaseDateDay   = 1;

        var owner         = clients[i]._id;
        var projectLeader = users[Math.floor(Math.random() * users.length)]._id;

        var instance = new Project({
          projectName  : projectName,
          description  : description,
          releaseDate  : new Date(releaseDateYear, releaseDateMonth, releaseDateDay),
          githubRepo   : null,
          owner        : mongoose.Types.ObjectId(owner),
          projectLeader: mongoose.Types.ObjectId(projectLeader)
        });

        instance.save(function (err, res) {
          if (err) {
            callback(err);
          } else {
          };
        });
      };
      callback(null);
    }
  ], function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log('Projects generated');
    };
  });
};

module.exports = generateProjects;
