function ProjectNewCtrl ($scope, projects, users, clients, session, socket) {
  session.auth();

  $scope.projectCreated = false;

  $scope.project = {};

  socket.emit('get users');
  socket.on('return users', function (response) {
    $scope.users = response;
  });

  socket.emit('get clients');
  socket.on('return clients', function (response) {
    $scope.clients = response;
  });

  $scope.sendForm = function () {
    socket.emit('add project', $scope.project);
  };

  socket.on('project added', function(response) {
    $scope.projectsCreated = true;
    $scope.projectsCreatedTxt = response;
    $scope.project = {};
  });

  socket.on('add project failed', function(response) {
    $scope.errorTxt = response;
  });
};
