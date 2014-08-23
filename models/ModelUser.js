var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  userName : String,
  pass     : String,
  firstName: String,
  lastName : String,
  email    : String,
  position : String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;