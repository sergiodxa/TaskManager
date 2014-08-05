function ProjectByClientCtrl ($scope, $routeParams, projects, session, socket) {
  session.auth();

  var clientId = $routeParams.id;

  projects.getByClient(clientId).then(function (response) {
    console.log(response);
    $scope.projects = response.data;
  });

  socket.emit('get projects by client');
  socket.on('return projects by client', function (response) {
    $scope.projects = response;
  });
};
