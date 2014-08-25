var mongoose = require('mongoose');
var Client   = require('../app/models/ModelClient');
var Project  = require('../app/models/ModelProject');
var User     = require('../app/models/ModelUser');

var projectNames = ['WebApp', 'Corporative Website', 'Intranet', 'eCommerce', '', 'Blog', 'Mobile App'];

function generateProjects () {
  Client.find(function (err, clients) {
    if (err) {
      console.error(err);
      return;
    } else {
      User.find({ position: 'Project Leader' }, function (err, users) {
        if (err) {
          console.error(err);
          return;
        } else {
          for (var i = 0; i < clients.length; i++) {
            var projectName = projectNames[Math.floor(Math.random() * projectNames)];
            var description = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, magnam. Eius, qui dolorum repudiandae exercitationem expedita fuga sapiente suscipit. Commodi dolores asperiores nesciunt fugiat voluptates. Ex atque perferendis explicabo minima!';

            var releaseDateYear  = 2015;
            var releaseDateMonth = Math.floor((Math.random() * 12) + 1);
            var releaseDateDay   = 1;

            var owner         = clients[i]._id;
            var projectLeader = users[Math.floor(Math.random() * users)]._id;

            var instance = new Project({
              projectName  : projectName,
              description  : description,
              releaseDate  : new Date(releaseDateYear, releaseDateMonth, releaseDateDay),
              githubRepo   : null,
              owner        : mongoose.Types.ObjectId(owner),
              projectLeader: mongoose.Types.ObjectId(data.projectLeader)
            });

            instance.save(function (err, res) {
              if (err) {
                console.error(err);
                return;
              };
            });
          };
        }
      });
    }
  });

  console.log('Projects generated');
};

module.exports = generateProjects;
