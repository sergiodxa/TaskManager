var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/taskmanager');

var User = require('./models/ModelUser');

var adminUser = {
  userName : 'admin',
  pass     : '1234',
  firstName: 'Admin',
  lastName : 'Root',
  email    : 'fake@mail.com',
  position : 'Project Leader'
};

var adminUser = new User({
  userName : 'admin',
  pass     : '1234',
  firstName: 'Admin',
  lastName : 'Root',
  email    : 'admin@mail.com',
  position : 'Project Leader'
});

adminUser.save(function (err, res) {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  };
});