function TaskNewCtrl ($scope, session, socket) {
  session.auth();

  $scope.taskCreated = false;
  $scope.task = {};

  socket.emit('get users');
  socket.on('return users', function (response) {
    $scope.users = response;
  });

  socket.emit('get projects');
  socket.on('return projects', function (response) {
    $scope.projects = response;
  });

  $scope.sendForm = function () {
    $scope.task.estimatedTime = parseInt($scope.task.estimatedTime);
    $scope.task.project = $scope.task.project;
    $scope.task.requiredTime = null;
    $scope.task.state = 1;
    $scope.task.userAssigned = $scope.task.userAssigned;
    socket.emit('add task', $scope.task);
  };

  socket.on('task added', function(response) {
    $scope.taskCreated = true;
    $scope.taskCreatedTxt = response;
    $scope.task = {};
  });

  socket.on('add task failed', function(response) {
    $scope.errorTxt = response;
  });
};
