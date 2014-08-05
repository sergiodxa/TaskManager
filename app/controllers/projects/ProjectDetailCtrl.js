function ProjectDetailCtrl ($scope, $routeParams, projects, session, socket) {
  session.auth();

  var id = $routeParams.id;

  projects.getSingle(id).then(function (response) {
    $scope.project = response.data;
  });

  socket.emit('get project', id);
  socket.on('return project', function (response) {
    $scope.project = response;
  });

  $scope.deleteProject = function () {
    socket.emit('delete project', id);
  };

  socket.on('project deleted', function (response) {
    window.location = '#/projects';
  });
};
