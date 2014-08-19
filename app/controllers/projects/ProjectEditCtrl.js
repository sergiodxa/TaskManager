function ProjectEditCtrl ($scope, $routeParams, session, socket) {
  session.auth();

  var id = $routeParams.id;
  console.log(id);

  $scope.projectEdited = false;
  
  socket.emit('get project without populate', id);
  socket.on('return project without populate', function (response) {
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
      id: $scope.project._id,
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
