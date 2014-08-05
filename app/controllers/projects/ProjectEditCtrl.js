function ProjectEditCtrl ($scope, $routeParams, projects, users, clients, session, socket) {
  session.auth();

  var id = $routeParams.id;

  $scope.projectEdited = false;
  
  socket.emit('get project', id);
  socket.on('return project', function (response) {
    $scope.project = response;
  });

  socket.emit('get users');
  socket.on('return users', function (response) {
    $scope.users = response;
  });

  socket.emit('get clients');
  socket.on('return clients', function (response) {
    $scope.clients = response;
  });

  $scope.sendForm = function () {
    socket.emit('edit project', {
      id: $scope.project.id,
      data: $scope.project
    });
  };

  socket.on('project edited', function(response) {
    $scope.projectEdited = true;
    $scope.projectEditedTxt = response;
  });

  socket.on('edit project failed', function(response) {
    $scope.errorTxt = response;
  });
};
