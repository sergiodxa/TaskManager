var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Client   = require('./ModelClient');
var User     = require('./ModelUser');

var ProjectSchema = new Schema({
  projectName  : String,
  description  : String,
  releaseDate  : Date,
  githubRepo   : String,
  owner        : { type: Schema.Types.ObjectId, ref : 'Client' },
  projectLeader: { type: Schema.Types.ObjectId, ref : 'User' }
});

var Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;