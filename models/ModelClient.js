var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ClientSchema = new Schema({
  clientName: String,
  email     : String,
  address   : String,
  telephone : Number
});

var Client = mongoose.model('Client', ClientSchema);

module.exports = Client;