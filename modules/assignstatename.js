/*
  Author: @sergiodxa
  Name: AssignStateName.js
  Version: 1.0.0
*/

module.exports = function (task) {
  switch(task.state) {
    case 1:
      task.stateName = 'to do';
      break;
    case 2:
      task.stateName = 'in progress';
      break;
    case 3:
      task.stateName = 'in testing';
    case 4:
      task.stateName = 'completed';
  }
  return task;
}