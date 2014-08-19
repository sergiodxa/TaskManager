var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User     = require('./ModelUser');
var Project  = require('./ModelProject');

var TaskSchema = new Schema({
  taskName     : String,
  description  : String,
  priority     : Number,
  estimatedTime: Number,
  requiredTime : Number,
  state        : Number,
  userAssigned : { type: Schema.Types.ObjectId, ref: 'User' },
  project      : { type: Schema.Types.ObjectId, ref: 'Project' }
});

var Task = mongoose.model('Task', TaskSchema);

module.exports = Task;