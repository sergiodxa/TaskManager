function ProjectDetailCtrl ($scope, $routeParams, session, socket) {
  session.auth();

  var id = $routeParams.id;

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
