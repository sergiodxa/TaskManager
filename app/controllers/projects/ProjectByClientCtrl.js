function ProjectByClientCtrl ($scope, $routeParams, session, socket) {
  session.auth();

  var clientId = $routeParams.id;

  socket.emit('get projects by client', clientId);
  socket.on('return projects by client', function (response) {
    $scope.projects = response;
  });
};
