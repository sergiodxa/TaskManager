function TaskDetailCtrl ($scope, $routeParams, session, socket) {
  session.auth();

  var id = $routeParams.id;

  $scope.itsMe = true;

  socket.emit('get task', id);
  socket.on('return task', function (response) {
    $scope.task = response;
  });

  $scope.deleteTask = function () {
    socket.emit('delete task', $scope.task);
  };

  socket.on('task deleted', function () {
    window.location = '#/tasks';
  })
};
