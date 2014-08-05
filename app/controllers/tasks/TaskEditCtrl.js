function TaskEditCtrl ($scope, $routeParams, session, socket) {
  session.auth();

  var id = $routeParams.id;
  $scope.taskEdited = false;

  socket.emit('get task', id);
  socket.on('return task', function (response) {
    $scope.task = response;
  });

  socket.emit('get users');
  socket.on('return users', function (response) {
    $scope.users = response;
  });

  socket.emit('get projects');
  socket.on('return projects', function (response) {
    $scope.projects = response;
  });

  $scope.sendForm = function () {
    tasks.edit(id, $scope.task).then(function (response) {
      console.log(response.data);
      if (response.data === 'Task data edited') {
        $scope.taskEditedTxt = response.data;
        $scope.taskEdited = true;
      } else {
        $scope.errorTxt = response.data;
      };
    });
  };

  $scope.sendForm = function () {
    socket.emit('edit task', $scope.task);
  };

  socket.on('task edited', function(response) {
    $scope.taskEdited = true;
    $scope.taskEditedTxt = response;
  });

  socket.on('edit task failed', function(response) {
    $scope.errorTxt = response;
  });
};
